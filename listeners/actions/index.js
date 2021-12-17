const { listInvites } = require('./list_invites.js');
const { acceptInvite } = require('./accept_invite.js');
const { submitSharedChannelInvite } = require('./submit_channel_invite.js');

module.exports.register = (app) => {
  app.action('submit_invite_action', submitSharedChannelInvite);
  app.action('list_invites_action', listInvites);
  app.action('accept_invite_action', acceptInvite);
};