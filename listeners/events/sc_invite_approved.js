const sharedChannelInviteApproved = async ({ client, event, body }) => {
  
  console.log('sharedChannelInviteApproved event');

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
          }
        ]
      }
    });
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteApproved };
