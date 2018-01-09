const mongoose = require('mongoose');
const {Schema} = mongoose;
const userSchema = new Schema({
  googleId: String
});
//use this command to create a new collection called users.
mongoose.model('users',userSchema);
