const submitSharedChannelInvite = async ({ ack, client, action, body }) => {
  try {
    await ack()

    console.log('in submit')
    let email = 'horeaporutiu1@gmail.com'
    let channel = 'C02QAHN7THV'
    let resp = await client.conversations.inviteShared({
      emails: email,
      channel: channel,
      free_trial_accepted: "true",
    })
    console.log('SHARED CHANEL INVITE')
    console.log(resp)
    
  } catch (error) {
    console.error(error);
  }
};

module.exports = { submitSharedChannelInvite };


