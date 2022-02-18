const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" +
  process.env.DB_PASSWORD +
  "@cluster0.yvswg.mongodb.net/slack_connect_test?retryWrites=true&w=majority";

const mongoose = require("mongoose");
let model = require('./db_model')

require("dotenv").config();

const connect = async function () {
  // Connect to MongoDB
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
}
// };

// const saveInvite = async function (invite) {
//   let acceptance, newInvite;
//   if (invite.acceptances != null) {
//     acceptance = invite.acceptances[0];
//     newInvite = new model.Invite({
//       _id: invite.invite.id,
//       invite: {
//         id: invite.invite.id,
//         inviting_team: {
//           id: invite.invite.inviting_team.id,
//           name: invite.invite.inviting_team.name,
//         },
//         inviting_user: {
//           id: invite.invite.inviting_user.id,
//           team_id: invite.invite.inviting_user.team_id,
//           name: invite.invite.inviting_user.name,
//         },
//         link: invite.invite.link,
//         recepient_email: invite.invite.recepient_email,
//       },
//       channel: {
//         id: invite.channel.id,
//         is_private: invite.channel.is_private,
//         is_im: invite.channel.is_im,
//         name: invite.channel.name,
//       },
//       acceptances: [{
//         approval_status: acceptance.approval_status,
//         accepting_team: {
//           id: acceptance.accepting_team.id,
//           name: acceptance.accepting_team.name,
//         },
//         accepting_user: {
//           id: acceptance.accepting_user.id,
//           team_id: acceptance.accepting_user.team_id,
//           name: acceptance.accepting_user.name,
//         },
//       }],
//       reviews: [{ type: "null", reviewing_team: { id: "null", name: "null" } }],
//       exp_date: 'test',
//       isIgnored: false,
//       externalFileURL: 'testExternalURL',
//     });
//   } else {
//     acceptance = "no acceptance";
//     newInvite = new model.Invite({
//       _id: invite.invite.id,
//       invite: {
//         id: invite.invite.id,
//         inviting_team: {
//           id: invite.invite.inviting_team.id,
//           name: invite.invite.inviting_team.name,
//         },
//         inviting_user: {
//           id: invite.invite.inviting_user.id,
//           team_id: invite.invite.inviting_user.team_id,
//           name: invite.invite.inviting_user.name,
//         },
//         link: invite.invite.link,
//         recepient_email: invite.invite.recepient_email,
//       },
//       channel: {
//         id: invite.channel.id,
//         is_private: invite.channel.is_private,
//         is_im: invite.channel.is_im,
//         name: invite.channel.name,
//       },
//       reviews: [{ type: "null", reviewing_team: { id: "null", name: "null" } }],
//       exp_date: 'test',
//       isIgnored: false,
//       externalFileURL: 'testExternalURL',
//     });
//   }
//   let resp = model.Invite.findByIdAndUpdate(invite.invite.id, newInvite, {
//     upsert: true,
//   });

//   return;
// };

module.exports = {
  connect
};
