let model = require('../../database/db_model')
const disconnectChannelCallback = async ({ ack, view, body, client }) => {
  console.log("disconnect view callback");
  await ack({
    "response_action": "clear",
  });  const providedValues = view.state.values;
  let channel =
    providedValues.channel_select_block.channels_select_actionID
      .selected_channel;

  let user = await model.User.find({ isEnterpriseInstall: true});

  let userToken;
  for (let i = 0; i < user.length; i++) {
    if (user[i].user.id == body.user.id) {
      console.log('found a user with that has enterprise token')
      userToken = await user[i].user.token
    }
  }

  try {

    let disconnect_resp = await client.admin.conversations.disconnectShared({
      token: userToken,
      channel_id: channel,
    });

  } catch (error) {
    throw new Error(error)
  }

  // console.log(disconnect_resp);
  return;
};
module.exports = { disconnectChannelCallback };
