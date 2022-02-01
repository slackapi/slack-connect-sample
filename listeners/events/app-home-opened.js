let homeView = require("../views/home-view.js")

const appHomeOpenedCallback = async ({ client, event, body }) => {

  if (event.tab !== 'home') return;
  
  let homeBlocks = await homeView.homeBlocks()
  let newBlocks = [{"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Send Invites",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "submit_invite_action",
					"style": "primary"
				},
        {
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "View Invitations",
						"emoji": true
					},
				  "value": event.user,
					"action_id": "list_invites_action",
				},
        {
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Disconnect Channels",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "disconnect_channel",
				}
			]
    }
  ]
  homeBlocks = homeBlocks.concat(newBlocks)

  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        "type": "home",
        "blocks": homeBlocks,
        "external_id": 'homeView'
      }
    });
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = { appHomeOpenedCallback };