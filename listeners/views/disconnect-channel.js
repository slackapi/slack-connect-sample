const disconnectChannelCallback = async ({ ack, view, body, client }) => {
  console.log("disconnecting");
  await ack();

  const providedValues = view.state.values;
  let channel = providedValues.channel_select_block.channels_select_actionID.selected_channel;
  
  console.log(providedValues);
  console.log(channel);
  
  console.log("process.env.SLACK_USER_TOKEN");
  console.log(process.env.SLACK_USER_TOKEN);

  let disconnect_resp = await client.admin.conversations.disconnectShared({
    token: process.env.SLACK_USER_TOKEN,
    channel_id: channel,
  });
  console.log(disconnect_resp);
};
module.exports = { disconnectChannelCallback };
