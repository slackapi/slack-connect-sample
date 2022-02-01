const acceptInvite = async ({ ack, client, action, body }) => {
  try {
  //   await ack()
  //   // console.log(client)
  //   console.log('accept shared invites')
  //   console.log('body.view.blocks: ')
  //   console.log(body.view.blocks)
  //      console.log('client invite quests list')
    
  //   let text = action.value
  //   let acceptInfo = text.split(",");
  //   let inviteId = acceptInfo[0]
  //   let channelName = acceptInfo[1]
  //   let channelId = acceptInfo[2]
  //   let userId = acceptInfo[3]

  //   console.log('inviteId: ')
  //   console.log(inviteId)
  //   console.log('channelName: ')
  //   console.log(channelName)
  //   console.log('channelId: ')
  //   console.log(channelId)
  //   console.log('userId: ')
  //   console.log(userId)

  //   // let respAPI = await client.conversations.acceptSharedInvite({
  //   //   token: 'xoxb-2876471908224-2852794958643-DZDtM5jXrFYdufM4A9eDktFM',
  //   //   channel_name: channelName,
  //   //   channel_id: channelId,
  //   //   invite_id: inviteId,
  //   //   team_id: 'T02RSDVSQ6L'
  //   // })
    
    
  // let homeblocks = [
  //    {
  //     "type": "section",
  //     "text": {
  //       "type": "mrkdwn",
  //       "text": "*Welcome To the Slack Connect Admin app :sparkles: :sparkles: * \n Here is a list of features you can try out to understand how the <https://api.slack.com/apis/connect#invite|Slack Connect APIs> can be used to automate admin tasks."
  //     }
  //   },
  //   {
	// 		"type": "divider"
	// 	},
	// 	{
	// 		"type": "section",
	// 		"text": {
	// 			"type": "mrkdwn",
	// 			"text": "*<https://api.slack.com/apis/connect#invite|Step 1: Invite users and make Slack Connect channels>*"
	// 		}
	// 	},
  //   {
	// 		"type": "section",
	// 		"text": {
	// 			"type": "mrkdwn",
	// 			"text": "*<https://api.slack.com/apis/connect#accept|Step 2: Accept Invitations>*"
	// 		}
	// 	},
  //   {
	// 		"type": "section",
	// 		"text": {
	// 			"type": "mrkdwn",
	// 			"text": "*<https://api.slack.com/apis/connect#approve|Step 3: Approve and Decline Invitations>* "
	// 		}
	// 	},
  //   {
	// 		"type": "section",
	// 		"text": {
	// 			"type": "mrkdwn",
	// 			"text": "*<https://api.slack.com/apis/connect#disconnect|Step 4: Disconnect Slack Connect channels>*"
	// 		}
	// 	},
	// 	{
	// 		"type": "actions",
	// 		"elements": [
	// 			{
	// 				"type": "button",
	// 				"text": {
	// 					"type": "plain_text",
	// 					"text": "Send Invites",
	// 					"emoji": true
	// 				},
	// 				"value": "click_me_123",
	// 				"action_id": "submit_invite_action",
	// 				"style": "primary"
	// 			},
  //       {
	// 				"type": "button",
	// 				"text": {
	// 					"type": "plain_text",
	// 					"text": "View Invitations",
	// 					"emoji": true
	// 				},
	// 			  "value": action.value,
	// 				"action_id": "list_invites_action",
	// 			},
  //       {
	// 				"type": "button",
	// 				"text": {
	// 					"type": "plain_text",
	// 					"text": "Disconnect Channels",
	// 					"emoji": true
	// 				},
	// 				"value": "click_me_123",
	// 				"action_id": "disconnect_channel",
	// 			}
	// 		]
	// 	},
	
	// ]
  //   // let 

  //   let resp = await client.conversations.listConnectInvites()
  //   let emails = []
  //   let inviteBlocks = []
  //   let divider = {
  //     type: "divider"
  //   }
    
    
  //   for (let i = 0; i<resp.invites.length; i++) {
      
  //     let currentInvite = await resp.invites[i]
      
  //     if (currentInvite.status == 'revoked' || currentInvite.status == 'approved' ) {continue}
      
  //     let email = currentInvite.invite.recipient_email
  //     if (currentInvite.acceptances != undefined ){
  //       if (currentInvite.acceptances[0].approval_status == 'approved') {continue}
  //       let awayTeamName = currentInvite.acceptances[0].accepting_team.name
  //       let awayTeamId = currentInvite.acceptances[0].accepting_team.id
  //       let newStr = currentInvite.invite.id + ',' + awayTeamId

  //       inviteBlocks.push(divider)
  //       inviteBlocks.push(
  //         {
  //           type: "section",
  //           text: {
  //             type: "mrkdwn",
  //             text: `<${currentInvite.invite.link}|Invite ${currentInvite.invite.id}> \n Invitation to: ${email} \n Inviting Team: ${currentInvite.invite.inviting_team.name} \n Inviting User: ${currentInvite.invite.inviting_user.name} \n Channel Name: ${currentInvite.channel.name} \n Status: Not yet approved` 
  //           }
  //         },
  //         {
  //           "type": "actions",
  //           "elements": [
  //             {
  //               "type": "button",
  //               "text": {
  //                 "type": "plain_text",
  //                 "text": "Approve",
  //                 "emoji": true
  //               },
  //               "value": newStr,
  //               "action_id": "approve_action",
  //               "style": "primary"
  //             },
  //             {
  //               "type": "button",
  //               "text": {
  //                 "type": "plain_text",
  //                 "text": "Deny",
  //                 "emoji": true
  //               },
  //               "value": newStr,
  //               "action_id": "deny_action",
  //               "style": "danger",
  //               "confirm": {
  //                 "title": {
  //                   "type": "plain_text",
  //                   "text": "Are you sure?"
  //                 },
  //                 "text": {
  //                   "type": "mrkdwn",
  //                   "text": "Do you want to deny this Slack Connect invitation?"
  //                 },
  //                 "confirm": {
  //                   "type": "plain_text",
  //                   "text": "Yes"
  //                 },
  //                 "deny": {
  //                   "type": "plain_text",
  //                   "text": "No"
  //                 }
  //               },
  //             },
  //             {
  //               "type": "button",
  //               "text": {
  //                 "type": "plain_text",
  //                 "text": "Upload file",
  //                 "emoji": true
  //               },
  //               "value": currentInvite.invite.id,
  //               "action_id": "upload_action",
  //             }
  //           ]
  //         }) 

  //     } 
  //     else 
  //     {
        
  //       let channelID = resp.invites[i].channel.id 
  //       let inviteID = resp.invites[i].invite.id
  //       let channelName = resp.invites[i].channel.name
  //       let acceptStr = inviteID + ',' + channelName + ',' + channelID
        
  //       console.log('no acceptances')
  //       inviteBlocks.push(divider)
  //       inviteBlocks.push(
  //         {
  //           type: "section",
  //           text: {
  //             type: "mrkdwn",
  //             text: `<${resp.invites[i].invite.link}|Invite ${resp.invites[i].invite.id}> \n Invitation to: ${email} \n Inviting Team: ${resp.invites[i].invite.inviting_team.name} \n Inviting User: ${resp.invites[i].invite.inviting_user.name} \n Channel Name: ${resp.invites[i].channel.name} \n Status: Not yet accepted` 
  //           }
  //         },
  //         {
  //           "type": "actions",
  //           "elements": [
  //             {
  //               "type": "button",
  //               "text": {
  //                 "type": "plain_text",
  //                 "text": "Accept",
  //                 "emoji": true
  //               },
  //               "value": acceptStr,
  //               "action_id": "accept_action",
  //               "style": "primary"
  //             },
  //             {
  //               "type": "button",
  //               "text": {
  //                 "type": "plain_text",
  //                 "text": "Ignore",
  //                 "emoji": true
  //               },
  //               "value": currentInvite.invite.id,
  //               "action_id": "ignore_action",
  //               "confirm": {
  //                 "title": {
  //                   "type": "plain_text",
  //                   "text": "Are you sure?"
  //                 },
  //                 "text": {
  //                   "type": "mrkdwn",
  //                   "text": "Do you want to ignore this Slack Connect invitation?"
  //                 },
  //                 "confirm": {
  //                   "type": "plain_text",
  //                   "text": "Yes"
  //                 },
  //                 "deny": {
  //                   "type": "plain_text",
  //                   "text": "No"
  //                 }
  //               },
  //             },
  //             {
  //               "type": "button",
  //               "text": {
  //                 "type": "plain_text",
  //                 "text": "Upload file",
  //                 "emoji": true
  //               },
  //               "value": currentInvite.invite.id,
  //               "action_id": "upload_action",
  //             }
  //           ]
  //         }) 
        
  //     }
  
  //     emails.push(resp.invites[i].invite.recipient_email)
 
  //   }
    
  //   // concat the old blocks (i.e. home blocks) with the invite blocks 
  //   let newBlocks = await homeblocks.concat(inviteBlocks)
    
  //    const result = await client.views.publish({
  //     // Pass the view_id
  //     user_id: body.user.id,

  //     view: {
  //       type: 'home',
  //       // View identifier
  //       callback_id: 'abcd',
  //       title: {
  //         type: 'plain_text',
  //         text: 'Updated modal'
  //       },
  //       blocks: newBlocks,
  //       private_metadata: body.user.id
        
  //     }
  //   });
    
    
    return


  } catch (error) {
    console.error(error);
  }
};

module.exports = { acceptInvite };
