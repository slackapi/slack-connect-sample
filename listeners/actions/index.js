const { submitSharedChannelInvite } = require('./submit_channel_invite.js');

module.exports.register = (app) => {
  app.action('submit_invite_action', submitSharedChannelInvite);
};