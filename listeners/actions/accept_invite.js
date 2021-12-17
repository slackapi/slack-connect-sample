const acceptInvite = async ({ ack, client, action, body }) => {
  try {
    await ack()
    console.log(client)
    console.log('accept shared invites')
    let channel = 'test_hack'
    let channel_id = 'C02QAHN7THV'
    let invite_id = 'I02R2SJFMKM'
    let resp = await client.conversations.acceptSharedInvite({
      channel_name: channel,
      invite_id: invite_id,
    })
    console.log(resp)
  } catch (error) {
    console.error(error);
  }
};

module.exports = { acceptInvite };
