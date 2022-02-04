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

const usersSchema = mongoose.Schema(
  {
    _id: String,
    teamId: String,
    botToken: String,
    botId: String,
    botUserId: String
  },
  { _id: false }
)

const Users = mongoose.model('Users', usersSchema)

const getUsers = async function () {
    let users = await Users.find({})
    return users
}

const getToken = async function (users, teamId, enterpriseId) {
  let botToken, botId, botUserId;
  for (let i = 0; i<users.length; i++) {
    if (teamId == users[i].teamId) {
      return {
        botToken: users[i].botToken,
        botId: users[i].botId,
        botUserId: users[i].botUserId
      };
    }
  }
  return
}

module.exports = {
  connect, Users, getUsers, getToken
}

