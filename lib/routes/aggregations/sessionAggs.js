const Router = require('express').Router();
const Session = require('../../models/Session');

Router
  .get('/average', ({ query }, res, next) => {
    const { userId } = query;
    Session.averageSessionTime(userId)
      .then(ave => res.json(ave))
      .catch(next);
  })
  .get('/total', (req, res, next) => {
    const { userId } = req.body;
    Session.totalSessionTime(userId)
      .then(ave => res.json(ave))
      .catch(next);
  });
  
module.exports = Router;
