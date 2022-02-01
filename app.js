const { App, LogLevel } = require("@slack/bolt");
require("dotenv").config();
const { registerListeners } = require("./listeners");

const installations = [
  {
    teamId: 'T02RSDVSQ6L',
    botToken: process.env.SLACK_BOT_TOKEN_EXT,
    botId: 'B02QN453RM5',
    botUserId: 'U02R2PCU6JX',
  },
  {
    teamId: 'T02752RBD2R',
    botToken: process.env.SLACK_BOT_TOKEN,
    botId: 'B02QMQK12AH',
    botUserId: 'U02QQPS44D9',
  },
   {
    teamId: 'T028QM79BGU',
    botToken: process.env.SLACK_BOT_TOKEN_DISCOVERY_TEST,
    botId: 'B0302RMCRE1',
    botUserId: 'U02UXMM6G4E',
  },
];



const authorizeFn = async ({ teamId, enterpriseId }) => {

  // Fetch team info from database
  for (const team of installations) {
    
    // Check for matching teamId and enterpriseId in the installations array
    if (team.teamId === teamId) {
      // This is a match. Use these installation credentials.
      return {
        // You could also set userToken instead
        botToken: team.botToken,
        botId: team.botId,
        botUserId: team.botUserId
      };
    }
  }

  throw new Error('No matching authorizations');
}

const app = new App({ authorize: authorizeFn, signingSecret: process.env.SLACK_SIGNING_SECRET });

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

