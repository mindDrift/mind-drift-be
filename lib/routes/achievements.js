const { Router } = require('express');
const Achievement = require('../models/Achievement');

module.exports = Router()
  .get('/achievements/new', ({ query }, res, next) => {
    const { userId } = query;
    
    Achievement
      .find({ userId, delivered: false })
      .then(achieves => res.send(achieves))
      .then(() => Achievement.markAsDelivered(userId))
      .catch(next);
  })
  
  .get('/achievements', ({ query }, res, next) => {
    const { userId } = query;

    Achievement
      .find({ userId })
      .then(achieves => res.send(achieves))
      .then(() => Achievement.markAsDelivered(userId))
      .catch(next);
  });
