const { appHomeOpenedCallback } = require('./app-home-opened');
const { sharedChannelInviteAccepted } = require('./sc_invite_accepted');
const { sharedChannelInviteApproved } = require('./sc_invite_approved');
const { sharedChannelInviteDeclined } = require('./sc_invite_declined');
const { sharedChannelInviteReceived } = require('./sc_invite_received');
const { messageDeleted } = require('./message_deleted');
const { messageChanged } = require('./message_changed');

module.exports.register = (app) => {
  app.event('app_home_opened', appHomeOpenedCallback);
  app.event('shared_channel_invite_accepted', sharedChannelInviteAccepted);
  app.event('shared_channel_invite_approved', sharedChannelInviteApproved);
  app.event('shared_channel_invite_declined', sharedChannelInviteDeclined);
  app.event('shared_channel_invite_received', sharedChannelInviteReceived);
  app.event('message_deleted', messageDeleted);
  app.event('message_changed', messageChanged);
};
