const { App, LogLevel } = require('@slack/bolt');
const { registerListeners } = require('./listeners');
const orgInstall = require('./database/auth/store-user-org-install')
const workspace_auth = require('./database/auth/store-user-workspace-install')
const html = require('./templates')
const db = require('./database/db')
let model = require('./database/db_model')
const customRoutes = require('./utils/custom_routes')
db.connect()

// For development purposes only
const tempDB = new Map();
console.log(customRoutes)
const app = new App({
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'horea-is-a-human',
  customRoutes: [
    {
      path: "/slack/install/",
      method: ["GET"],
      handler: (req, res) => {
        res.writeHead(200);
        res.end(html.normalInstall);
      },
    },
    {
        path: "/slack/install/userToken",
        method: ["GET"],
        handler: (req, res) => {
          res.writeHead(200);
          res.end(html.userTokenInstall);
        },
      },
  ],
  installerOptions: {
    stateVerification: false,
  },
  installationStore: {
    storeInstallation: async (installation) => {

      if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
          console.log('you should only install after you have installed this app on the workspace level')
          return await orgInstall(installation)
      }
      if (installation.team !== undefined) {
        return await workspace_auth.saveUserWorkspaceInstall(installation)
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async (installQuery) => {
      console.log('inside fetchInstallation installQuery: ')
      console.log(installQuery)
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        console.log('fetching enterprise install')
        return tempDB.get(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {

        let user = await model.User.find({ _id: installQuery.teamId});
        // console.log('user: ')
        // console.log(user)
        if (user[0]!= undefined){
          return user[0]
        }
      }
      throw new Error('Failed fetching installation');
    },
  },
});

/** Register Listeners */
registerListeners(app);

/** Start Bolt App */
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running! ⚡️');
  } catch (error) {
    console.error('Unable to start App', error);
  }
})();