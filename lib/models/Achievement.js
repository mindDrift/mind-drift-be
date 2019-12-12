const { Schema, model } = require('mongoose');
const masterAchievementsList = require('../data/achievementsList');

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
  created: {
    type: Date,
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
  const oldAchievementNames = userAchievements.map(({ name }) => name);

  const newAchievements = masterAchievementsList
    .filter(({ qualifier, name }) => {
      if(!qualifier.streak) return false;
      if(currentStreak < qualifier.streak) return false;
      if(oldAchievementNames.includes(name)) return false;
      return true;
    })
    .map(achievement => ({ 
      ...achievement, 
      userId, 
      created: new Date(), 
      delivered: false 
    }));

  return await this.insertMany(newAchievements);
}); 

schema.static ('markAsDelivered', async function(userId) {
  return this.updateMany(
    { userId, delivered: false },
    { $set: { delivered: true } }
  );
}); 

module.exports = model('Achievements', schema);
