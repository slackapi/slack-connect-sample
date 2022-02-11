const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" +
  process.env.DB_PASSWORD +
  "@cluster0.yvswg.mongodb.net/slack_connect_test?retryWrites=true&w=majority";

const mongoose = require("mongoose");

require("dotenv").config();

const connect = async function () {
  // Connect to MongoDB
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
};

const usersSchema = mongoose.Schema(
  {
    _id: String,
    team: { id: String, name: String },
    enterprise: { id: String, name: String },
    user: { token: String, scopes: String, id: String },
    tokenType: String,
    isEnterpriseInstall: Boolean,
    appId: String,
    authVersion: String,
    bot: {
      scopes: [
        String,
      ],
      token: String,
      userId: String,
      id: String,
    },
  },
  { _id: false },
);

const inviteSchema = mongoose.Schema(
  {
    _id: String,
    invite: {
      id: String,
      inviting_team: { id: String, name: String },
      inviting_user: { id: String, team_id: String, name: String },
      link: String,
      recepient_email: String,
    },
    channel: { id: String, is_private: Boolean, is_im: Boolean, name: String },
    acceptances: [{
      approval_status: String,
      accepting_team: { id: String, name: String },
      accepting_user: { id: String, team_id: String, name: String },
    }],
    reviews: [{ type: String, reviewing_team: { id: String, name: String } }],
    exp_date: String,
    isIgnored: Boolean,
    externalFileURL: String,
  },
  { _id: false },
);

const User = mongoose.model("User", usersSchema);
const Invite = mongoose.model("Invite", inviteSchema);

const getUsers = async function () {
  let users = User.find({});
  return users;
};

const saveInvite = async function (invite) {
  let acceptance, newInvite;
  if (invite.acceptances != null) {
    acceptance = invite.acceptances[0];
    newInvite = new Invite({
      _id: invite.invite.id,
      invite: {
        id: invite.invite.id,
        inviting_team: {
          id: invite.invite.inviting_team.id,
          name: invite.invite.inviting_team.name,
        },
        inviting_user: {
          id: invite.invite.inviting_user.id,
          team_id: invite.invite.inviting_user.team_id,
          name: invite.invite.inviting_user.name,
        },
        link: invite.invite.link,
        recepient_email: invite.invite.recepient_email,
      },
      channel: {
        id: invite.channel.id,
        is_private: invite.channel.is_private,
        is_im: invite.channel.is_im,
        name: invite.channel.name,
      },
      acceptances: [{
        approval_status: acceptance.approval_status,
        accepting_team: {
          id: acceptance.accepting_team.id,
          name: acceptance.accepting_team.name,
        },
        accepting_user: {
          id: acceptance.accepting_user.id,
          team_id: acceptance.accepting_user.team_id,
          name: acceptance.accepting_user.name,
        },
      }],
      reviews: [{ type: "null", reviewing_team: { id: "null", name: "null" } }],
    });
  } else {
    acceptance = "no acceptance";
    newInvite = new Invite({
      _id: invite.invite.id,
      invite: {
        id: invite.invite.id,
        inviting_team: {
          id: invite.invite.inviting_team.id,
          name: invite.invite.inviting_team.name,
        },
        inviting_user: {
          id: invite.invite.inviting_user.id,
          team_id: invite.invite.inviting_user.team_id,
          name: invite.invite.inviting_user.name,
        },
        link: invite.invite.link,
        recepient_email: invite.invite.recepient_email,
      },
      channel: {
        id: invite.channel.id,
        is_private: invite.channel.is_private,
        is_im: invite.channel.is_im,
        name: invite.channel.name,
      },
    });
  }
  let resp = Invite.findByIdAndUpdate(invite.invite.id, newInvite, {
    upsert: true,
  });

  return;
};

const getToken = async function (users, teamId, enterpriseId) {
  let botToken, botId, botUserId;
  for (let i = 0; i < users.length; i++) {
    if (teamId == users[i].teamId) {
      return {
        botToken: users[i].botToken,
        botId: users[i].botId,
        botUserId: users[i].botUserId,
        teamId: users[i].teamId,
      };
    }
  }
  return;
};

module.exports = {
  connect,
  User,
  Invite,
  getUsers,
  getToken,
  saveInvite,
};
