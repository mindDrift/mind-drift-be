const request = require('supertest');

describe('Settings API', () => {

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

  it('posts settings', () => {
    return request
      .post('/settings')
      .send(settings)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot();
      });
  });
});
