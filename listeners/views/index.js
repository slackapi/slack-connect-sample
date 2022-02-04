const { homeViewCallback } = require('./home-view');
const { inviteUserViewCallback } = require('./invite-user-modal');
const { inviteSubmittedCallback } = require('./invite-submitted');
const { disconnectChannelCallback } = require('./disconnect-channel');
const { uploadFileCallback } = require('./upload-file');

module.exports.register = (app) => {
  app.view('home_view', homeViewCallback);
  app.view('inviteUserView', inviteUserViewCallback);
  app.view('inviteSubmitted', inviteSubmittedCallback);
  app.view('disconnect', disconnectChannelCallback);
  app.view('uploadFileCallback', uploadFileCallback);
};
