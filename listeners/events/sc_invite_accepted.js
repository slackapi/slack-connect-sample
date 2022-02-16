let homeView = require("../views/home_view.js");
let utils = require("../../utils/utils.js");

const sharedChannelInviteAccepted = async (
  { context, client, event, body },
) => {
  console.log('shared invite accepted')
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
