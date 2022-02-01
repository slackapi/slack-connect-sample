const sharedChannelInviteAccepted = async ({ client, event, body }) => {
  

  try {
    console.log('sharedChannelInviteAccepted');
    console.log(event)
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteAccepted };
