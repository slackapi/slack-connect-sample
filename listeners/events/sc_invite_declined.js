const sharedChannelInviteDeclined = async ({ client, event, body }) => {
  
    
  try {
    console.log('sharedChannelInviteDeclined');
    console.log(event)
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteDeclined };
