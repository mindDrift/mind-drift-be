require("dotenv").config();
const request = require("../request");
const connect = require("../../lib/utils/connect");
const mongoose = require("mongoose");

describe("Settings API", () => {
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
    userId: "123456",
    settings: {
      userId: "123456",
      title: "Different Breathing Type",
      description: "This is a different breathing technique.",
      inhale: 3,
      holdIn: 4,
      exhale: 5,
      holdOut: 1,
      endTime: 16
    }
  };

  const session2 = {
    start: new Date(),
    duration: 5,
    userId: "123456",
    settings: {
      userId: "123456",
      title: "Another Breathing Pattern",
      description: "This is a new breathing technique.",
      inhale: 1,
      holdIn: 5,
      exhale: 8,
      holdOut: 4,
      endTime: 20
    }
  };

  function postSessions(sessions) {
    return request
      .post("/api/v1/sessions")
      .send(sessions)
      .expect(200)
      .then(({ body }) => body);
  }

  it("posts sessions", () => {
    return request
      .post("/api/v1/sessions")
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
            "settings": Object {
              "description": "This is a different breathing technique.",
              "endTime": 16,
              "exhale": 5,
              "holdIn": 4,
              "holdOut": 1,
              "inhale": 3,
              "title": "Different Breathing Type",
              "userId": "123456",
            },
            "start": Any<String>,
            "userId": "123456",
          }
        `
        );
      });
  });

  it("gets a session", () => {
    return postSessions(session)
      .then(() => {
        return request.get("/api/v1/sessions?userId=123456").expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(1);
        expect(body[0].duration).toBe(16);
      });
  });

  it("gets the last session", () => {
    return Promise.all([postSessions(session), postSessions(session2)])
      .then(() => {
        return request.get("/api/v1/sessions?userId=123456").expect(200);
      })
      .then(({ body }) => {
        console.log(body);
        expect(body.length).toBe(2);
        expect(body[1].duration).toBe(5);
        expect(body).toMatchInlineSnapshot(`
          Array [
            Object {
              "__v": 0,
              "_id": "5df2b277a01ab0b6566f13d8",
              "duration": 16,
              "settings": Object {
                "description": "This is a different breathing technique.",
                "endTime": 16,
                "exhale": 5,
                "holdIn": 4,
                "holdOut": 1,
                "inhale": 3,
                "title": "Different Breathing Type",
                "userId": "123456",
              },
              "start": "2019-12-12T21:34:46.916Z",
              "userId": "123456",
            },
            Object {
              "__v": 0,
              "_id": "5df2b277a01ab0b6566f13d9",
              "duration": 5,
              "settings": Object {
                "description": "This is a new breathing technique.",
                "endTime": 20,
                "exhale": 8,
                "holdIn": 5,
                "holdOut": 4,
                "inhale": 1,
                "title": "Another Breathing Pattern",
                "userId": "123456",
              },
              "start": "2019-12-12T21:34:46.916Z",
              "userId": "123456",
            },
          ]
        `);
      });
  });
});
