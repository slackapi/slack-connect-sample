const { sampleViewCallback } = require('./sample-view');
const { homeViewCallback } = require('./home-view');

module.exports.register = (app) => {
  app.view('sample_view_id', sampleViewCallback);
  app.view('home_view', homeViewCallback);
};
