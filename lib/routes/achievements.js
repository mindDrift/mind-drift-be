const { Router } = require('express');
const Achievement = require('../models/Achievement');

module.exports = Router()
  .get('/achievements', ({ query }, res, next) => {
    Achievement
      .find({ userId: query.userId })
      .then(achieves => res.send(achieves))
      .catch(next);
  });
