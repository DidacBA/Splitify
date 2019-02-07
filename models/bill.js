const mongoose = require('mongoose');

const { Schema } = mongoose;

const billSchema = new Schema({
  // creatorId: [{
  //   type: ObjectId,
  //   ref: 'User',
  // }],
  // participants: [{
  //   type: ObjectId,
  //   ref: 'User',
  // }],
  creatorId: Array,
  participants: Array,
  items: Array,
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
