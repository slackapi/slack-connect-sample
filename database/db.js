const uri = 'mongodb+srv://' + process.env.DB_USERNAME + ':' +
  process.env.DB_PASSWORD +
  '@cluster0.yvswg.mongodb.net/slack_connect_test?retryWrites=true&w=majority';

const mongoose = require('mongoose');

require('dotenv').config();

const connect = async function() {
  // Connect to MongoDB
  mongoose.connect(
      uri,
      {useNewUrlParser: true, useUnifiedTopology: true},
  );
};

module.exports = {
  connect,
};
