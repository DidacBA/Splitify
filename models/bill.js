const mongoose = require('mongoose');

const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const billSchema = new Schema({
  name: String,
  creatorId: [{
    type: ObjectId,
    ref: 'User',
  }],
  coords: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
  participants: Array,
  items: Array,
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
