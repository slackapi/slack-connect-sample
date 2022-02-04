const inviteSubmittedCallback = async ({ ack, view, body, client }) => {
  try {
    await ack();

    const providedValues = view.state.values;
    console.log(providedValues);

    const selectedChannel = await providedValues.channel_select_block
      .channels_select_actionID.selected_channel;
    console.log("selectedChannel: ");
    console.log(selectedChannel);

    const emailToInvite = await providedValues.email_input_block
      .email_input_actionID.value;
    console.log("emailToInvite: ");
    console.log(emailToInvite);

    let isExternalLimited = await providedValues.is_external_limited_block
      .this_is_an_action_id.selected_option.value;
    console.log(isExternalLimited);
    if (isExternalLimited === "Limited") {
      isExternalLimited = true;
    } else {
      isExternalLimited = false;
    }
    console.log("isExternalLimited: ");
    console.log(isExternalLimited);

    let resp = await client.conversations.inviteShared({
      channel: selectedChannel,
      emails: emailToInvite,
      external_limited: isExternalLimited,
    });
    console.log('resp after inviteShared API call: ')
    console.log(resp)
    return;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { inviteSubmittedCallback };
