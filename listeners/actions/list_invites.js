let homeView = require("../views/home-view.js");
let utils = require("../utils/utils.js");

const listInvites = async ({ ack, client, action, body }) => {
  try {
    await ack();

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

module.exports = { listInvites };
