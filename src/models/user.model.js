const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Post',
  }],
});

module.exports = mongoose.model('User', userSchema);
