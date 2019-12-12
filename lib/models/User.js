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

  const { lastSessionDate, currentStreak } = await this.find({ userId });
  // console.log(moment().calendar(lastSessionDate));
  // console.log(moment().calendar(start));
  console.log(moment(start).diff(moment(lastSessionDate), 'days'));

});



module.exports = model('Users', schema);
