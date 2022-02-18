let model = require('./../db_model')
const saveUserWorkspaceInstall = async function (installation) {

    let resp = await model.User.updateOne(
      { _id: installation.team.id },
      {
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
      },
      { upsert: true })
    
  };
module.exports = { saveUserWorkspaceInstall };