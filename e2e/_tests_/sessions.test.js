require('dotenv').config();
const request = require('../request');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const moment = require('moment');
const { markAsDelivered, updateUser } = require('../../lib/models/Achievement');

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

  const fake = {
    start: true,
    duration: {},
    userId: []
  };

  const session2 = {
    start: moment(new Date()).add(1, 'days'),
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

  it('gets average', () => {
    return postSessions(session)
      .then(() => {
        return request.get('/api/v1/average?userId=123456').expect(200);
      })
      .then(({ body }) => {
        expect(body[0].averageTime).toBe(16);
      });
  });

  it('gets average', () => {
    return postSessions(session)
      .then(() => {
        return request.get('/api/v1/total?userId=123456').expect(200);
      })
      .then(({ body }) => {
        expect(body[0].totalTime).toBe(16);
      });
  });

  it('posts a session and a user', () => {
    return postSessions(session)
      .then(() => {
        return request.get('/api/v1/users?userId=123456').expect(200);
      })
      .then(({ body }) => {
  
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            lastSessionDate: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "currentStreak": 1,
            "lastSessionDate": Any<String>,
            "userId": "123456",
          }
        `
        );
      });
  });

  it('post sessions and get new achievements', () => {
    return postSessions(session)
      .then(() => {
        return postSessions(session2);
      })
      .then(() => {
        return request.get('/api/v1/users?userId=123456').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(1);
      })
      .then(() => {
        return request.get('/api/v1/achievements/new?userId=123456').expect(200);
      })
      .then(({ body }) => {
        expect(body[0].delivered).toBe(false);
      });
  });

  it('post sessions and get achievements', () => {
    return postSessions(session)
      .then(() => {
        return postSessions(session2);
      })
      .then(() => {
        return request.get('/api/v1/users?userId=123456').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBeLessThanOrEqual(2);
      })
      .then(() => {
        return request.get('/api/v1/achievements?userId=123456').expect(200);
      })
      .then(({ body }) => {
        expect(body[0].delivered).toBe(false);
      });
  });
  it('should get a 404', () => {
    return request
      .post('/aFakeThing')
      .send(session)
      .expect(404);
  });
  it('should get a 400', () => {
    return request
      .post('/api/v1/sessions')
      .send(fake)
      .expect(400);
  });
});
