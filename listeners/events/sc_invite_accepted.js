let homeView = require("../views/home-view.js");
let utils = require("../../utils.js");

const sharedChannelInviteAccepted = async (
  { context, client, event, body },
) => {
  let userID = body.event.accepting_user.id;
  let homeblocks = await homeView.homeBlocks();
  let inviteBlocks = await utils.listInvites(client, userID);
  let newBlocks = await homeblocks.concat(inviteBlocks);

  const result = await client.views.publish({
    user_id: userID,
    view: {
      type: "home",
      blocks: newBlocks,
      private_metadata: userID,
    },
  });

  return;
};

module.exports = { sharedChannelInviteAccepted };
