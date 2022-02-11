let homeView = require("../views/home_view.js");
let utils = require("../../utils/utils.js");

const denyInvite = async ({ ack, client, action, body }) => {
  try {
    await ack();
    let workspace;

    let text = action.value;
    let inviteInfo = text.split(",");
    let awayTeam = inviteInfo[1];
    let inviteId = inviteInfo[0];
    console.log("awayTeam: ");
    console.log(awayTeam);
    console.log("inviteId: ");
    console.log(inviteId);

    let declineResp = await client.conversations.declineSharedInvite({
      invite_id: inviteId,
      target_team: awayTeam,
    });

    if (!declineResp.ok) {
      console.log("error from decline shared invite: ");
      console.log(declineResp);
      return;
    } else {
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
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { denyInvite };
