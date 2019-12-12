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
  const [user] = await this.find({ userId });
  let { lastSessionDate, currentStreak } = user;
  console.log(lastSessionDate, currentStreak);
  if(!lastSessionDate) {
    return this.create({ userId, lastSessionDate: start, currentStreak: 0 });
  }
  
  const difference = moment(start).diff(moment(lastSessionDate), 'days');
  switch(difference) {
    case 0: 
      break;
    case 1:
      currentStreak++;
      break;
    default:
      currentStreak = 0;
  }
  console.log('new', lastSessionDate, currentStreak);
  return this.findOneAndUpdate({ userId }, { userId, lastSessionDate: start, currentStreak });
});



module.exports = model('Users', schema);
