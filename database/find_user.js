
let model = require('./db_model')

const findUser = async function (id) {
    console.log('inside findUser')
    console.log(id)
    let user = await model.User.find({ _id: id});
    console.log(user)
    if (user[0] != undefined) {
        console.log('about to return user')
        console.log(user[0])
    return user[0];
    }
  }

  module.exports = {
    findUser
  };