const { Schema, model } = require('mongoose');
const Session = require('../models/Session');

const schema = new Schema({
  name: {
    type: String,
    enum: ['First Steps', '2-Day Streak', '5-Day Streak', '10-Day Streak', '25-Day Streak', '50-Day Streak'],
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
  delivered: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    required: true
  }
});

schema.static ('updateUser', async function(userId) {
  
  const sessions = await Session.find({ userId });

  const userAchievements = sessions.reduce((list) => {
    list.push({
      name: 'First Steps',
      image: 'image',
      description: 'description',
      userId: userId
    });
    return list;
  });
  
  return this.insertMany(userAchievements);
}); 

module.exports = model('Achievements', schema);
