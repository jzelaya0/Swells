//USER MODEL
// Require packages for User model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

//USER SCHEMA
//  ============================================
var UserSchema = new Schema({
  name: String,
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true, select: false}
});
