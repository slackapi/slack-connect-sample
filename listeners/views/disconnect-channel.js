const disconnectChannelCallback = async ({ ack, view, body, client }) => {
  console.log("disconnect view callback");
  await ack({
    "response_action": "clear",
  });  const providedValues = view.state.values;
  let channel =
    providedValues.channel_select_block.channels_select_actionID
      .selected_channel;
  console.log("providedValues");
  console.log(providedValues);
  console.log(channel);
  console.log("process.env.SLACK_USER_TOKEN");

  console.log(process.env.SLACK_USER_TOKEN);
  try {

    let disconnect_resp = await client.admin.conversations.disconnectShared({
      token: process.env.SLACK_USER_TOKEN,
      channel_id: channel,
    });

  } catch (error) {
    throw new Error(error)
  }

  // console.log(disconnect_resp);
  return;
};
module.exports = { disconnectChannelCallback };
