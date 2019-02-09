const mongoose = require('mongoose');

const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const billSchema = new Schema({
  name: String,
  creatorId: [{
    type: ObjectId,
    ref: 'User',
  }],
  participants: Array,
  items: Array,
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
