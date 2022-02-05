const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0.yvswg.mongodb.net/slack_connect_test?retryWrites=true&w=majority";

const mongoose = require('mongoose')

require('dotenv').config()

const connect = async function () {
  // Connect to MongoDB
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
}

const usersSchemaOld = mongoose.Schema(
  {
    _id: String,
    teamId: String,
    botToken: String,
    botId: String,
    botUserId: String
  },
  { _id: false }
)

const usersSchema = mongoose.Schema(
  {
    _id: String,
    team: { id: String, name: String },
    enterprise: { id: String, name:  String },
    user: { token: String, scopes: String, id: String },
    tokenType: String,
    isEnterpriseInstall: Boolean,
    appId: String,
    authVersion: String,
    bot: {
      scopes: [
        String
      ],
      token: String,
      userId: String,
      id: String
  }
},
  { _id: false }
)

const Users = mongoose.model('Users', usersSchema)

const getUsers = async function () {
    let users = await Users.find({})
    return users
}

const saveUser = async function (installation) {
  const newUser = new Users({ 
    _id: Math.random(),
    teamId: 'Zildjian',
    botToken: 'hi',
    botId: 'botId',
    botUserId: 'hello'
  });
  await newUser.save()
  console.log('newUser added: ');
  console.log(newUser)
  return
}

const getToken = async function (users, teamId, enterpriseId) {
  let botToken, botId, botUserId;
  for (let i = 0; i<users.length; i++) {
    if (teamId == users[i].teamId) {
      return {
        botToken: users[i].botToken,
        botId: users[i].botId,
        botUserId: users[i].botUserId,
        teamId: users[i].teamId
      };
    }
  }
  return
}

module.exports = {
  connect, Users, getUsers, getToken, saveUser
}

