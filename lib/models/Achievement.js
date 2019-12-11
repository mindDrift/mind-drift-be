const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    enum: ['First Steps', 'Oops!', 'Creative', 'Tinkerer', '2-Day Streak', '5-Day Streak', '10-Day Streak', '25-Day Streak', '50-Day Streak', '100-Day Streak', '200-Day Streak', '300-Day Streak'],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = model('Achievements', schema);
