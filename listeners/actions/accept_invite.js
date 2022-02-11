let homeView = require("../views/home_view.js");
let utils = require("../../utils/utils.js");

const acceptInvite = async ({ ack, client, action, body }) => {
  try {
    await ack();

    let text = action.value;
    let acceptInfo = text.split(",");
    let inviteId = acceptInfo[0];
    let channelName = acceptInfo[1];
    let channelId = acceptInfo[2];

    console.log("before accept shared invite API call");

    let acceptResp = await client.conversations.acceptSharedInvite({
      channel_name: channelName,
      channel_id: channelId,
      invite_id: inviteId,
    });

    console.log(acceptResp);

    let homeblocks = await homeView.homeBlocks();
    let inviteBlocks = await utils.listInvites(client, action.value);
    let newBlocks = await homeblocks.concat(inviteBlocks);

    const result = await client.views.publish({
      user_id: body.user.id,
      view: {
        type: "home",
        blocks: newBlocks,
        private_metadata: body.user.id,
      },
    });

    return;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { acceptInvite };
