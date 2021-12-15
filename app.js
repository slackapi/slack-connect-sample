
const { App, LogLevel } = require('@slack/bolt');
require('dotenv').config();
const { registerListeners } = require('./listeners');

console.log('hello')
console.log(process.env.SLACK_BOT_TOKEN)

/** Initialization **/
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
});

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
