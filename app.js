const { App, LogLevel } = require("@slack/bolt");
require("dotenv").config();
const { registerListeners } = require("./listeners");
const { express } = require("express");
let dbUtils = require("./utils/db-utils.js");

const authorizeFn = async ({ teamId, enterpriseId }) => {
  try {
    let connection = await dbUtils.connect();
    let users = await dbUtils.getUsers();
    let token = await dbUtils.getToken(users, teamId, enterpriseId);
    return token;
  } catch (error) {
    console.error("Auth error: ", error);
  }
};

const app = new App({
  authorize: authorizeFn,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

registerListeners(app);

/** Start Bolt App **/
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log("⚡️ Bolt app is running! ⚡️");
  } catch (error) {
    console.error("Unable to start App", error);
  }
})();
