require('dotenv').config();
const request = require('../request');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');

describe('Sessions', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  const session = {
    start: new Date(),
    duration: 16,
    userId: '123456'
  };

  function postSessions(sessions) {
    return request
      .post('/api/v1/sessions')
      .send(sessions)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts sessions', () => {
    return request
      .post('/api/v1/sessions')
      .send(session)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            ...session,
            __v: 0,
            _id: expect.any(String),
            start: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "duration": 16,
            "start": Any<String>,
            "userId": "123456",
          }
        `
        );
      });
  });

  it('gets a session', () => {
    return postSessions(session)
      .then(() => {
        return request.get('/api/v1/sessions?userId=123456').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(1);
        expect(body[0].duration).toBe(16);
      });
  });
});
