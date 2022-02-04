let homeView = require("../views/home-view.js");
let utils = require("../utils/utils.js");

const acceptInvite = async ({ ack, client, action, body }) => {
  try {
    await ack();

    let text = action.value;
    let acceptInfo = text.split(",");
    let inviteId = acceptInfo[0];
    let channelName = acceptInfo[1];
    let channelId = acceptInfo[2];
    let userId = acceptInfo[3];

    console.log("inviteId: ");
    console.log(inviteId);
    console.log("channelName: ");
    console.log(channelName);
    console.log("channelId: ");
    console.log(channelId);
    console.log("userId: ");
    console.log(userId);

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
