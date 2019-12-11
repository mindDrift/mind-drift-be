const { Router } = require('express');
const Setting = require('../models/Setting');

module.exports = Router()
  .get('/settings', ({ query }, res, next) => {
    const settingsQuery = { $in: ['__default__', query.userId || ''] };

    Setting
      .find({ userId: settingsQuery })
      .then(settings => res.send(settings))
      .catch(next);
  })

  .post('/settings', (req, res, next) => {
    const { userId, title, description, inhale, holdIn, exhale, holdOut, endTime } = req.body;
    Setting
      .create({ userId, title, description, inhale, holdIn, exhale, holdOut, endTime })
      .then(settings => res.send(settings))
      .catch(next);
  })

  .put('/settings/:id', ({ params, body }, res, next) => {
    Setting
      .findByIdAndUpdate(
        params.id,
        body, 
        { new: true })
      .then(updatedSettings => res.json(updatedSettings))
      .catch(next);
  })

  .delete('/settings/:id', ({ params }, res, next) => {
    Setting
      .findByIdAndRemove(params.id)
      .then(deleted => res.json(deleted))
      .catch(next);
  });

