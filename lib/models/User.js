const { Schema, model } = require('mongoose');
const moment = require('moment');

const schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  lastSessionDate: {
    type: Date,
    required: false
  },
  currentStreak: {
    type: Number,
    required: true
  }
});

schema.static ('updateStreak', async function(userId, start) {
  const users = await this.find({ userId });
  if(!users.length) {
    return this.create({ userId, lastSessionDate: start, currentStreak: 1 });
  }

  let { lastSessionDate, currentStreak } = users[0];

  const difference = moment(start).diff(moment(lastSessionDate), 'days');
  switch(difference) {
    case 0: 
      break;
    case 1:
      currentStreak++;
      break;
    default:
      currentStreak = 1;
  }
  return this.findOneAndUpdate({ userId }, { userId, lastSessionDate: start, currentStreak }, { new: true });
});

module.exports = model('Users', schema);
