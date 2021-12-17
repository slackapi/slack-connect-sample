const sharedChannelInviteReceived = async ({ client, event, body }) => {
  
  console.log('sharedChannelInviteReceived event');
  console.log(event)
  let invId = 'I02QXQZMF7D'

  // Ignore the `app_home_opened` event for anything but the Home tab
  if (event.tab !== 'home') return;

  try {
    console.log(event)
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteReceived };
