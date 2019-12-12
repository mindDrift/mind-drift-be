const { Router } = require('express');
const Session = require('../models/Session');
const User = require('../models/User');
const Achievement = require('../models/Achievement');

module.exports = Router()
  .get('/sessions/lastSession', ({ query }, res, next) => {
    if(!query.userId) return null;

    Session
      .find({ userId: query.userId })
      .then(sessions => {
        if(sessions.length) return res.send(sessions[sessions.length - 1]);
        return res.send(null);
      })
      .catch(next);
  })

  .get('/sessions', ({ query }, res, next) => {
    const userQuery = query.userId && { userId: query.userId };
    Session
      .find(userQuery || {})
      .then(sessions => res.send(sessions))
      .catch(next);
  })

  .post('/sessions', (req, res, next) => {
    const { start, duration, userId, moods } = req.body;
    Session
      .create({ start, duration, userId, moods })
      .then(session => res.send(session))
      .then(() => User.updateStreak(userId, start))
      .then(user => Achievement.updateUser(user))
      .catch(next);
  });
