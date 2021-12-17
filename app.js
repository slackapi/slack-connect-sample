
const { App, LogLevel } = require('@slack/bolt');
require('dotenv').config();
const { registerListeners } = require('./listeners');

// /** Initialization **/
// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   socketMode: true,
//   appToken: process.env.SLACK_APP_TOKEN,
//   logLevel: LogLevel.DEBUG,
// });

const installations = [
  {
    enterpriseId: 'T02RSDVSQ6L',
    teamId: 'T02RSDVSQ6L',
    botToken: process.env.SLACK_BOT_TOKEN_EXT,
    botId: 'B1251',
    botUserId: 'U12385',
  },
  {
    teamId: 'T77712',
    botToken: process.env.SLACK_BOT_TOKEN,
    botId: 'B5910',
    botUserId: 'U1239',
  },
];

const authorizeFn = async ({ teamId, enterpriseId }) => {
  console.log(teamId)
  console.log(enterpriseId)
  // Fetch team info from database
  for (const team of installations) {
    // Check for matching teamId and enterpriseId in the installations array
    if ((team.teamId === teamId) && (team.enterpriseId === enterpriseId)) {
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

console.log(app)
// NOTE: This is for demonstration purposes only.
// All sensitive data should be stored in a secure database
// Assuming this app only uses bot tokens, the following object represents a model for storing the credentials as the app is installed into multiple workspaces.



/** Register Listeners **/
registerListeners(app);

/** Start Bolt App **/
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running! ⚡️');
  } catch (error) {
    console.error('Unable to start App', error);
  }
})();
