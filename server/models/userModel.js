const mongoose  = require('mongoose');

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}, 
}); 

const User =  mongoose.model("User", UserSchema)
module.exports = User;

