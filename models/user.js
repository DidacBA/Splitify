const mongoose = require('mongoose');

const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  imgPath: {
    type: String,
    default: 'https://i.imgur.com/etjgJ2D.jpg',
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  myFriends: [{
    type: ObjectId,
    reference: 'User',
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
