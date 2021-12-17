const listInvites = async ({ ack, client, action, body }) => {
  
  try {
    await ack()
    console.log('in submit for list invites')
    let resp = await client.conversations.listConnectInvites()
    console.log('resp: ')
    console.log(resp)
    for (let i = 0; i<resp.invites.length; i++) {
      console.log(resp.invites[i])
    }
    console.log('body: ')
    console.log(body)
    say(body)
  } catch (error) {
    console.error(error);
  }
};

module.exports = { listInvites };