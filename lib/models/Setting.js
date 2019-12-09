const { Schema, model } = require('mongoose');

const schema = new Schema({
  userId: {
    type: String,
    required: true,
  }, 
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }, 
  inhale: {
    type: Number,
    required: true,
  },
  inHold: {
    type: Number,
    required: true,
    default: 0,
  },
  exhale: {
    type: Number,
    required: true,
  },
  outHold: {
    type: Number,
    required: true,
    default: 0,
  },
  endTime: {
    type: Number,
    required: true,
  },
});

module.exports = model('Settings', schema);
