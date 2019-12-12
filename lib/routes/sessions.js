const { Router } = require('express');
const Session = require('../models/Session');
const User = require('../models/User');
const Achievement = require('../models/Achievement');

module.exports = Router()
  .get('/sessions', ({ query }, res, next) => {
    const userQuery = query.userId && { userId: query.userId };
    Session
      .find(userQuery || {})
      .then(sessions => res.send(sessions))
      .catch(next);
  })

  .post('/sessions', (req, res, next) => {
    const { start, duration, userId, moods, settings } = req.body;
    Session
      .create({ start, duration, userId, moods, settings })
      .then(session => res.send(session))
      .then(() => User.updateStreak(userId, start))
      .then(user => Achievement.updateUser(user))
      .catch(next);
  });
