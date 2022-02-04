let homeView = require("./home-view.js");

const listInvitesCallback = async ({ ack, view, body, client }) => {
  let homeblocks = await homeView.homeBlocks();

  try {
    await ack();

    let resp = await client.conversations.listConnectInvites();
    let emails = [];
    let inviteBlocks = [];
    let divider = {
      type: "divider",
    };

    for (let i = 0; i < resp.invites.length; i++) {
      let currentInvite = await resp.invites[i];

      if (
        currentInvite.status == "revoked" || currentInvite.status == "approved"
      ) {
        continue;
      }

      let email = currentInvite.invite.recipient_email;
      inviteBlocks.push(divider);
      if (currentInvite.acceptances != undefined) {
        let awayTeamName = currentInvite.acceptances[0].accepting_team.name;
        let awayTeamId = currentInvite.acceptances[0].accepting_team.id;
        let newStr = currentInvite.invite.id + "," + awayTeamId;

        inviteBlocks.push(
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                `<${currentInvite.invite.link}|Invite ${currentInvite.invite.id}> \n Invitation to: ${email} \n Inviting Team: ${currentInvite.invite.inviting_team.name} \n Inviting User: ${currentInvite.invite.inviting_user.name} \n Channel Name: ${currentInvite.channel.name} \n Status: Not yet approved`,
            },
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Approve",
                  "emoji": true,
                },
                "value": newStr,
                "action_id": "approve_action",
                "style": "primary",
              },
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Deny",
                  "emoji": true,
                },
                "value": newStr,
                "action_id": "deny_action",
                "style": "danger",
                "confirm": {
                  "title": {
                    "type": "plain_text",
                    "text": "Are you sure?",
                  },
                  "text": {
                    "type": "mrkdwn",
                    "text":
                      "Do you want to deny this Slack Connect invitation?",
                  },
                  "confirm": {
                    "type": "plain_text",
                    "text": "Yes",
                  },
                  "deny": {
                    "type": "plain_text",
                    "text": "No",
                  },
                },
              },
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Upload file",
                  "emoji": true,
                },
                "value": currentInvite.invite.id,
                "action_id": "upload_action",
              },
            ],
          },
        );
      } else {
        inviteBlocks.push(
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `<${resp.invites[i].invite.link}|Invite ${
                resp.invites[i].invite.id
              }> \n Invitation to: ${email} \n Inviting Team: ${
                resp.invites[i].invite.inviting_team.name
              } \n Inviting User: ${
                resp.invites[i].invite.inviting_user.name
              } \n Channel Name: ${
                resp.invites[i].channel.name
              } \n Status: Not yet accepted`,
            },
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Accept",
                  "emoji": true,
                },
                "value": resp.invites[i].channel.name,
                "action_id": "accept_action",
                "style": "primary",
              },
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Ignore",
                  "emoji": true,
                },
                "value": currentInvite.invite.id,
                "action_id": "ignore_action",
                "confirm": {
                  "title": {
                    "type": "plain_text",
                    "text": "Are you sure?",
                  },
                  "text": {
                    "type": "mrkdwn",
                    "text":
                      "Do you want to ignore this Slack Connect invitation?",
                  },
                  "confirm": {
                    "type": "plain_text",
                    "text": "Yes",
                  },
                  "deny": {
                    "type": "plain_text",
                    "text": "No",
                  },
                },
              },
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Upload file",
                  "emoji": true,
                },
                "value": currentInvite.invite.id,
                "action_id": "upload_action",
              },
            ],
          },
        );
      }
    }

    // concat the old blocks (i.e. home blocks) with the invite blocks
    let newBlocks = await homeblocks.concat(inviteBlocks);
    console.log(JSON.stringify(resp.invites));

    const result = await client.views.update({
      // Pass the view_id
      view_id: body.view.id,
      // Pass the current hash to avoid race conditions
      hash: body.view.hash,
      // View payload with updated blocks
      view: {
        type: "home",
        // View identifier
        callback_id: "view_1",
        title: {
          type: "plain_text",
          text: "Updated modal",
        },
        blocks: newBlocks,
        // private_metadata: JSON.stringify(resp.invites)
      },
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};
module.exports = { listInvitesCallback };
