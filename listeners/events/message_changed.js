const messageChanged = async ({ client, event, body }) => {
  
  console.log('message messageChanged');
  // Ignore the `app_home_opened` event for anything but the Home tab
  if (event.tab !== 'home') return;

  try {
    console.log(event)
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = { messageChanged };
