// const { confirmInviteCallback } = require('./confirm-invite');
let homeView = require("./home-view.js");
let utils = require("../../utils.js");

const uploadFileCallback = async ({ ack, view, body, client }) => {
  try {
    await ack();

    let userID = body.user.id;
    let inviteID = body.view.private_metadata;
    const providedValues = view.state.values;
    let fileURL = providedValues.uploadFileURL.upload_action.value;

    let remoteFileUploadResp = await client.files.remote.add({
      external_id: "test123",
      "title": "testTitle",
      "external_url": fileURL,
    });

    let homeblocks = await homeView.homeBlocks();

    let inviteBlocks = await utils.addFile(inviteID, fileURL, client, userID);

    // concat the old blocks (i.e. home blocks) with the invite blocks
    let newBlocks = await homeblocks.concat(inviteBlocks);

    const result = await client.views.publish({
      user_id: userID,
      view: {
        type: "home",
        blocks: newBlocks,
        private_metadata: userID,
      },
    });

    console.log("remoteFileUploadResp: ");
    console.log(remoteFileUploadResp);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadFileCallback };
