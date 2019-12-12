const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .get('/users', ({ query }, res, next) => {
    User
      .find({ userId: query.userId })
      .then(user => res.send(user))
      .catch(next);
  });
