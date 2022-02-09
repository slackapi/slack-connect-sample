const sharedChannelInviteReceived = async ({ client, event, body }) => {
  try {
    await ack();

    console.log('sharedChannelInviteReceived');
    console.log(event)
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteReceived };
