require('dotenv').config();
const request = require('../request');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');

describe('Settings API', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  const settings = {
    userId: '5689',
    title: 'Box Breathing',
    description: 'This is a breathing technique.',
    inhale: 5,
    holdIn: 4,
    exhale: 5,
    holdOut: 4,
    endTime: 126
  };

  const settings2 = {
    userId: '123456',
    title: 'Different Breathing Type',
    description: 'This is a different breathing technique.',
    inhale: 3,
    holdIn: 4,
    exhale: 5,
    holdOut: 1,
    endTime: 16
  };

  function postSettings(settings) {
    return request
      .post('/api/v1/settings')
      .send(settings)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts settings', () => {
    return request
      .post('/api/v1/settings')
      .send(settings)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            ...settings,
            _id: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "description": "This is a breathing technique.",
            "endTime": 126,
            "exhale": 5,
            "holdIn": 4,
            "holdOut": 4,
            "inhale": 5,
            "title": "Box Breathing",
            "userId": "5689",
          }
        `
        );
      });
  });

  it('gets settings', () => {
    return Promise.all([
      postSettings(settings),
      postSettings(settings2)
    ])
      .then(() => {
        return request
          .get('/api/v1/settings')
          .expect(200);
      })
      .then(({ body }) => {
        console.log(body);
        // expect(body.length).toBe(2);
        // expect(body[0].title).toBe('Box Breathing');
        // expect(body[1].title).toBe('Different Breathing Type');
      });
  });

});
