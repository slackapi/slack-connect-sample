const uploadBlocks = async () => {
  // Intro message -

  let blocks = [
    {
      "type": "input",
      "block_id": "uploadFileURL",
      "element": {
        "type": "plain_text_input",
        "action_id": "upload_action",
        "placeholder": {
          "type": "plain_text",
          "text": "Paste a link to your file below",
        },
      },
      "label": {
        "type": "plain_text",
        "text":
          "This file will be used by the admin to approve or deny the invitation.",
      },
    },
  ];
  return blocks;
};

module.exports = { uploadBlocks };
