const { Router } = require('express');
const Session = require('../models/Session');

module.exports = Router()
  .post('/session', (req, res, next) => {
    const { start, end, userId, moods, settings } = req.body;
    Session
      .create({ start, end, userId, moods, settings })
      .then(session => res.send(session))
      .catch(next);
  });
