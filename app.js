const { App, LogLevel } = require("@slack/bolt");
const { registerListeners } = require("./listeners");
const orgInstall = require("./database/auth/store-user-org-install");
const workspace_auth = require("./database/auth/store-user-workspace-install");
const html = require("./templates");
const db = require("./database/db");
const dbQuery = require("./database/find_user");
let model = require("./database/db_model");
db.connect();

const app = new App({
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: "horea-is-a-human",
  customRoutes: [
    {
      path: "/slack/install/workspace",
      method: ["GET"],
      handler: (req, res) => {
        res.writeHead(200);
        res.end(html.workspaceInstall);
      },
    },
    {
      path: "/slack/install/orgadmin",
      method: ["GET"],
      handler: (req, res) => {
        res.writeHead(200);
        res.end(html.orgAdminInstall);
      },
    },
  ],
  installerOptions: {
    stateVerification: false,
  },
  installationStore: {
    storeInstallation: async (installation) => {
      if (
        installation.isEnterpriseInstall &&
        installation.enterprise !== undefined
      ) {
        console.log(
          "you should only install after you have installed this app on the workspace level",
        );
        return await orgInstall.saveUserOrgInstall(installation);
      }
      if (installation.team !== undefined) {
        return await workspace_auth.saveUserWorkspaceInstall(installation);
      }
      throw new Error("Failed saving installation data to installationStore");
    },
    fetchInstallation: async (installQuery) => {
      console.log("inside fetchInstallation installQuery: ");
      console.log(installQuery);
      if (
        installQuery.isEnterpriseInstall &&
        installQuery.enterpriseId !== undefined
      ) {
        return await dbQuery.findUser(installQuery.enterpriseId)
      }
      if (installQuery.teamId !== undefined) {
        return await dbQuery.findUser(installQuery.teamId)
      }
      throw new Error("Failed fetching installation");
    },
  },
});

/** Register Listeners */
registerListeners(app);

/** Start Bolt App */
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log("⚡️ Bolt app is running! ⚡️");
  } catch (error) {
    console.error("Unable to start App", error);
  }
})();
