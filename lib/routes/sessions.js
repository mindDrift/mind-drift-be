const { Router } = require('express');
const Session = require('../models/Session');

module.exports = Router()
  .post('/sessions', (req, res, next) => {
    const { start, duration, userId, moods, settings } = req.body;

    Session
      .create({ start, duration, userId, moods, settings })
      .then(session => res.send(session))
      .catch(next);
  });
