const { App, LogLevel } = require('@slack/bolt');
const { config } = require('dotenv');
const { registerListeners } = require('./listeners');
const dbUtils = require('./utils/db-utils.js')
console.log('hello')
let connection = dbUtils.connect()
config();

// For development purposes only
const tempDB = new Map();
console.log('hello2')

const app = new App({
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  scopes: ['channels:history', 'chat:write', 'commands'],
  installationStore: {
    storeInstallation: async (installation) => {
      console.log('installation: ')
      console.log(installation)
      // Org-wide installation
      if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
        console.log('do we go in here? ')
        
         const newUser = new dbUtils.Users({ 
          _id: Math.random(),
          team: { id: installation.team.id, name: installation.team.name  },
          enterprise: { id: installation.enterprise.id, name:  installation.enterprise.name},
          user: { token: installation.user.token, scopes: installation.user.scopes, id: installation.user.id },
          tokenType: installation.tokenType,
          isEnterpriseInstall: installation.isEnterpriseInstall,
          appId: installation.appId,
          authVersion: installation.authVersion,
          bot: {
            scopes: installation.bot.scopes, 
            token: installation.bot.token,
            userId:installation.bot.userId,
            id: installation.bot.id
          }
        });
        console.log(newUser)
        let resp = await newUser.save()
        console.log(resp)
        return tempDB.set(installation.enterprise.id, installation);
        
      }
      // Single team installation
      if (installation.team !== undefined) {
        console.log('installation.team !== undefined ')
        
        // return tempDB.set(installation.team.id, installation);
        const newUser = new dbUtils.Users({ 
          _id: installation.team.id,
          team: { id: installation.team.id, name: installation.team.name  },
          //leave enterprise id out for now
          enterprise: { id: 'null', name:  'null'},
          //leave user scopes out for now, may want to re implmement this later
          user: { token: 'null', scopes: 'null', id: installation.user.id },
          tokenType: installation.tokenType,
          isEnterpriseInstall: installation.isEnterpriseInstall,
          appId: installation.appId,
          authVersion: installation.authVersion,
          bot: {
            scopes: installation.bot.scopes, 
            token: installation.bot.token,
            userId:installation.bot.userId,
            id: installation.bot.id
          }
        });
        
        let query = { /* query */ };
        let update = {expire: new Date()};
        let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        let resp = await dbUtils.Users.findOneAndUpdate(query, update, options);
        console.log('resp after new storing single team install: ')
        console.log(resp)
        return
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async (installQuery) => {
      console.log(installQuery)
      // Org-wide installation lookup
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
                console.log('go into is enterpriuse install: ')
        return tempDB.get(installQuery.enterpriseId);
      }
      // Single team installation lookup
      if (installQuery.teamId !== undefined) {
        // return tempDB.get(installQuery.teamId);
        // let something = await tempDB.get(installQuery.teamId);
        // console.log('something: ')
        // console.log(something)
        let user = await dbUtils.Users.find({ _id: installQuery.teamId});
                console.log('user: ')
        console.log(user)
        if (user[0]!= undefined){
          return user[0]
        }

      }
      throw new Error('Failed fetching installation');
    },
  },
  installerOptions: {
    // If true, /slack/install redirects installers to the Slack Authorize URL
    // without rendering the web page with "Add to Slack" button
    directInstall: false,
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