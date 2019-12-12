const { Schema, model } = require('mongoose');
const Session = require('../models/Session');
const achievementList = require('../data/achievementsList');

const schema = new Schema({
  name: {
    type: String,
    enum: ['First Steps', '2-Day Streak', '5-Day Streak', '10-Day Streak', '25-Day Streak', '50-Day Streak'],
    required: true
  },
  img: {
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

schema.static ('updateUser', async function(user) {
  const { userId, currentStreak } = user;
  const userAchievements = await this.find({ userId });

  const newAchievements = [];
  achievementList.forEach(({ qualifier, name, img, description }) => {
    if(qualifier.streak && currentStreak >= qualifier.streak) {

      if(!userAchievements.includes(ele => name === ele.name)) {
        newAchievements.push({ name, img, description, userId, delivered: false });
      }
      
    }
  });

  return this.insertMany(newAchievements);
}); 

module.exports = model('Achievements', schema);
