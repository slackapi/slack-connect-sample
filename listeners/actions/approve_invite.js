let homeView = require("../views/home_view.js");
let utils = require("../../utils/utils.js");

const approveInvite = async ({ ack, client, action, body }) => {
  try {
    await ack();
    let workspace;

    console.log(action)

    //action.value is used to pass in info such as inviteID, userID, and teamID
    let text = action.value;
    let inviteInfo = text.split(",");
    let inviteId = inviteInfo[0];
    let awayTeam = inviteInfo[1];

    console.log(inviteId)
    console.log(awayTeam)

    // API call to approve the invite
    let approveResp = await client.conversations.approveSharedInvite({
      invite_id: inviteId,
      target_team: awayTeam,
    });

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

module.exports = { approveInvite };
