const messageDeleted = async ({ client, event, body }) => {
  
  console.log('message deleted');
  // Ignore the `app_home_opened` event for anything but the Home tab
  try {
    console.log(event)
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = { messageDeleted };
