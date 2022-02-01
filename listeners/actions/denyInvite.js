let invites = require("../views/listInvites.js")

const denyInvite = async ({ ack, client, action, body }) => {
  try {
    await ack()
    let workspace;
    
    let text = action.value
    let inviteInfo = text.split(",");
    let awayTeam = inviteInfo[1]
    let inviteId = inviteInfo[0]
    console.log('awayTeam: ')
    console.log(awayTeam)
    console.log('inviteId: ')
    console.log(inviteId)

    let resp = await client.conversations.declineSharedInvite({
      invite_id: inviteId,
      // target_team: 'T028QM79BGU'
      target_team: awayTeam
    })
    
    
    console.log('resp after approve shared invite: ')
    console.log(resp)

  } catch (error) {
    console.error(error);
  }
};

module.exports = { denyInvite };
