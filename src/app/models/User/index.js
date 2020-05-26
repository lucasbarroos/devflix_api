const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  profession: String,
  channels: [{
    type: Schema.ObjectId, ref: 'channels',
  }],
});

module.exports = mongoose.model('users', userSchema);
