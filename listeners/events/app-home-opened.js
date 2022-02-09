let homeView = require("../views/home-view.js");
let utils = require("../../utils/utils.js");

const appHomeOpenedCallback = async ({ client, event, body }) => {
  if (event.tab !== "home") return;

  let homeBlocks = await homeView.homeBlocks(event.user);
	await ack();
  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        "type": "home",
        "blocks": homeBlocks,
        "external_id": "homeView",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { appHomeOpenedCallback };
