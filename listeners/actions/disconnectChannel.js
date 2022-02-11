let disconnectModal = require("../views/disconnect-channel-modal.js");

const disconnectChannel = async ({ ack, client, action, body }) => {
  try {
    await ack();
    console.log("disconnectChannel action listener ");
    let disconnectBlocks = await disconnectModal.disconnectBlocks();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        "type": "modal",
        "notify_on_close": true,
        "callback_id": "disconnect",
        "title": {
          "type": "plain_text",
          "text": "Disconnect a Channel",
        },
        "blocks": disconnectBlocks,
        "submit": {
          "type": "plain_text",
          "text": "Disconnect",
        },
      },
    });
    console.log('does it ever reach here? in disconnectChannel action listener')
  } catch (error) {
    console.error(error);
  }
};

module.exports = { disconnectChannel };
