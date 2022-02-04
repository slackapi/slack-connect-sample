const uploadBlocks = async () => {
  // Intro message -

  let str = "hello world";

  return str;
};

const addFile = async (inviteID, fileURL, client, userID) => {
  let resp = await client.conversations.listConnectInvites();

  let divider = {
    type: "divider",
  };
  let inviteBlocks = [];

  for (let i = 0; i < resp.invites.length; i++) {
    let blockText;
    let currentInvite = await resp.invites[i];
    let email = currentInvite.invite.recipient_email;
    if (inviteID == currentInvite.invite.id) {
      console.log("going into fileURL");
      blockText =
        `<${currentInvite.invite.link}|Invite ${currentInvite.invite.id}> \n Invitation to: ${email} \n Inviting Team: ${currentInvite.invite.inviting_team.name} \n Inviting User: ${currentInvite.invite.inviting_user.name} \n Channel Name: ${currentInvite.channel.name} \n Status: Not yet approved \n File: ${fileURL}`;
    } else {
      blockText =
        `<${currentInvite.invite.link}|Invite ${currentInvite.invite.id}> \n Invitation to: ${email} \n Inviting Team: ${currentInvite.invite.inviting_team.name} \n Inviting User: ${currentInvite.invite.inviting_user.name} \n Channel Name: ${currentInvite.channel.name} \n Status: Not yet approved`;
    }

    if (
      currentInvite.status == "revoked" || currentInvite.status == "approved"
    ) {
      continue;
    }

    if (currentInvite.acceptances != undefined) {
      if (currentInvite.acceptances[0].approval_status == "approved") continue;

      let awayTeamName = currentInvite.acceptances[0].accepting_team.name;
      let awayTeamId = currentInvite.acceptances[0].accepting_team.id;
      let newStr = currentInvite.invite.id + "," + awayTeamId + "," + userID;

      inviteBlocks.push(divider);
      inviteBlocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: blockText,
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
                  "text": "Do you want to deny this Slack Connect invitation?",
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
      let channelID = resp.invites[i].channel.id;
      let inviteID = resp.invites[i].invite.id;
      let channelName = resp.invites[i].channel.name;
      let acceptStr = inviteID + "," + channelName + "," + channelID + "," +
        userID;

      inviteBlocks.push(divider);
      inviteBlocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: blockText,
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
              "value": acceptStr,
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
              "action_id": "deny_action",
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

  console.log("about to return inviteBlocks: ");
  console.log(inviteBlocks);

  return inviteBlocks;
};

const listInvites = async (client, userID) => {
  let resp = await client.conversations.listConnectInvites();

  let divider = {
    type: "divider",
  };
  let inviteBlocks = [];

  for (let i = 0; i < resp.invites.length; i++) {
    let currentInvite = await resp.invites[i];

    if (
      currentInvite.status == "revoked" || currentInvite.status == "approved"
    ) {
      continue;
    }

    let email = currentInvite.invite.recipient_email;

    if (currentInvite.acceptances != undefined) {
      if (currentInvite.acceptances[0].approval_status == "approved") continue;

      let awayTeamName = currentInvite.acceptances[0].accepting_team.name;
      let awayTeamId = currentInvite.acceptances[0].accepting_team.id;
      let newStr = currentInvite.invite.id + "," + awayTeamId + "," + userID;

      inviteBlocks.push(divider);
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
                  "text": "Do you want to deny this Slack Connect invitation?",
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
      let channelID = resp.invites[i].channel.id;
      let inviteID = resp.invites[i].invite.id;
      let channelName = resp.invites[i].channel.name;
      let acceptStr = inviteID + "," + channelName + "," + channelID + "," +
        userID;

      inviteBlocks.push(divider);
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
              "value": acceptStr,
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
              "action_id": "deny_action",
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

  return inviteBlocks;
};

module.exports = { uploadBlocks, addFile, listInvites };
