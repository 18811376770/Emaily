const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipientSchema = require('./Recipient');
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  //refer to architecture in the notes
  recipients: [RecipientSchema],
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  //this is suppose to be a reference field
  _user: {type: Schema.Types.ObjectId, ref:'User'},
  //provide more feature to user
  dateSent: Date,
  lastRespond: Date
});

mongoose.model('surveys', surveySchema);
