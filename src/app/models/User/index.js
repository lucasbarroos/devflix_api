const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  profession: String,
});

module.exports = mongoose.model('users', userSchema);
