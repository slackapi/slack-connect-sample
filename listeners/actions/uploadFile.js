let uploadModal = require("../views/upload-file-modal.js");

const uploadFile = async ({ ack, client, action, body }) => {
  try {
    console.log("upload file");

    let uploadBlocks = await uploadModal.uploadBlocks();
    await ack();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        "type": "modal",
        "notify_on_close": true,
        "callback_id": "uploadFileCallback",
        "title": {
          "type": "plain_text",
          "text": "Upload a File",
        },
        "blocks": uploadBlocks,
        "submit": {
          "type": "plain_text",
          "text": "Upload",
        },
        "private_metadata": action.value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadFile };
