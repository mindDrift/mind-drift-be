const { Schema, model } = require('mongoose');

const schema = new Schema({
  start: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true
  }, 
  userId: {
    type: String,
    required: true,
    unique: true
  }, 
  settings: {
    type: Object,
    required: true
  },
  moods: {
    type: Array
  }
});

module.exports = model('Sessions', schema);
