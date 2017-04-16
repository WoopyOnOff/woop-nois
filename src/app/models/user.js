// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    login: String,
    password: String, // SHA256
    firstname: String,
    lastname: String,
    admin: Boolean
}));

// Command for add user in db
// db.users.insert({
//     login : 'username',
//     password: '',
//     firstname: '',
//     lastname: '',
//     admin: true
// });
