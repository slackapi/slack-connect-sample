
const inviteUserBlock = async() => {
  
    // Intro message - 
    
    let blocks = [
		{
			"type": "input",
      "block_id": "channel_select_block",
			"element": {
				"type": "channels_select",
				"action_id": "channels_select_actionID",
				"placeholder": {
					"type": "plain_text",
					"text": "Pick a channel"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "Pick a (Slack Connect) channel to invite members to"
			}
		},
		{
			"type": "input",
      "block_id": "email_input_block",
			"element": {
				"type": "plain_text_input",
				"action_id": "email_input_actionID",
				"placeholder": {
					"type": "plain_text",
					"text": "acme-corp@mail.com"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "Invite users via email"
			}
		},
		{
			"type": "section",
      "block_id": "is_external_limited_block",
			"text": {
				"type": "plain_text",
				"text": "Pick a type of invite. Limited means that this member cannot add members of their own team once they are added to this Slack Connect channel. Normal means that this user will be able to invite members of their own workspace to this channel."
			},
			"accessory": {
				"type": "radio_buttons",
				"action_id": "this_is_an_action_id",
				"initial_option": {
					"value": "Normal",
					"text": {
						"type": "plain_text",
						"text": "Normal"
					}
				},
				"options": [
					{
						"value": "Normal",
						"text": {
							"type": "plain_text",
							"text": "Normal"
						}
					},
					{
						"value": "Limited",
						"text": {
							"type": "plain_text",
							"text": "Limited"
						}
					}
				]
			}
		}
	]
    return blocks
  };
  
  
  
  module.exports = { inviteUserBlock };