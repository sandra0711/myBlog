const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  },
});

module.exports = mongoose.model('Post', postSchema);
