const appHomeOpenedCallback = async ({ client, event, body }) => {

  console.log('app home opened event');
  // Ignore the `app_home_opened` event for anything but the Home tab
  if (event.tab !== 'home') return;

  console.log(body)
  let homeTeam = 'T02752RBD2R'
  if (body.team_id != homeTeam) {
    client.token = process.env.SLACK_BOT_TOKEN_EXT
    event.user = body.authorizations[0].user_id
  }

  console.log('after setting token - client.token: ')
  console.log(client.token)
  console.log('event: ')
  console.log(event.user)

  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        "type": "home",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Welcome home, <@" + event.user + "> :house:*"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>."
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "input",
            "block_id": "input123",
            "label": {
              "type": "plain_text",
              "text": "Enter an email to invite to the hackathon"
            },
            "element": {
              "type": "plain_text_input",
              "action_id": "plain_input",
              "placeholder": {
                "type": "plain_text",
                "text": "Enter an email to invite to a Slack Connect channel"
              }
            }
          },
          {
            "type": "actions",
            "block_id": "actions1",
            "elements": [
              {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Submit Invite"
                },
                "value": "cancel",
                "action_id": "submit_invite_action"
              },
              {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "List Invites"
                },
                "value": "cancel",
                "action_id": "list_invites_action"
              },
              {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Accept Invite"
                },
                "value": "cancel",
                "action_id": "accept_invite_action"
              }
            ]
          }
        ]
      }
    });
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = { appHomeOpenedCallback };
