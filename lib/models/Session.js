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
    required: true
  }
});

schema.static('averageSessionTime', function(userId) {
  const pipeline = 
  [{
    $match: {
      userId: userId
    }
  }, {
    $group: {
      _id: '$userId',
      averageTime: {
        $avg: '$duration'
      }
    }
  }];
  return this.aggregate(pipeline);
});

schema.static('totalSessionTime', function(userId) {
  const pipeline = 
  [{
    $match: {
      userId: userId
    }
  }, {
    $group: {
      _id: '$userId',
      totalTime: {
        $sum: '$duration'
      }
    }
  }];
  return this.aggregate(pipeline);
});


module.exports = model('Sessions', schema);
