//USER MODEL
// Require packages for User model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

//USER SCHEMA
//  ============================================
var UserSchema = new Schema({
  name: String,
  username: {type: String, required: true, index: {unique: true}},//No duplicate usernames
  password: {type: String, required: true, select: false}//Do not return password
});

//HASH PASSWORD
//  ============================================

//Hash password before saving
UserSchema.pre('save', function(next){
  var user = this;

  //Hash password only if the password has been changed or is new
  if(!user.isModified('password')) return next();

  //Generate Salt
  bcrypt.hash(user.password,null, null, function(err,hash){
    if(err) return next(err);
      //Change the password to the hash version
      user.password = hash;
      next();
  });
});


//Create method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password){
  var user = this;

  return bcrypt.compareSync(password,user.password);
};

//Create User model out of userSchema
var User = mongoose.model('User', UserSchema);

module.exports = User;
