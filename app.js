const { App, LogLevel } = require('@slack/bolt');
const { registerListeners } = require('./listeners');
const dbUtils = require('./utils/db_utils.js')
const html = require('./templates')
dbUtils.connect()

// For development purposes only
const tempDB = new Map();

const app = new App({
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'horea-is-a-human',
  customRoutes: [
    {
      path: '/slack/install/org_admin_install',
      method: ['GET'],
      handler: (req, res) => {
        res.writeHead(200);
        res.end(html.orgAdminInstall)
      },
    },
    {
      path: '/slack/install/',
      method: ['GET'],
      handler: (req, res) => {
        res.writeHead(200);
        res.end(html.workspaceInstall)
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
          return (await dbUtils.saveUserOrgInstall(installation))
      }
      // Single team installation
      if (installation.team !== undefined) {
        return (await dbUtils.saveUserWorkspaceInstall(installation))
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

        let user = await dbUtils.User.find({ _id: installQuery.teamId});
        console.log('user: ')
        console.log(user)
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