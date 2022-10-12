const { io } = require('socket.io-client');
const request = require('supertest');
const { app } = require('../server/server');

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const callback_url = 'http://localhost:4000/auth/github/callback';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Testing to ensure server responds with status 200 and text/html content type when a GET request is sent to the main page
      it('responds with 200 status and text/html content type', () => request(app)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200));
    });
  });

  describe('/auth', () => {
    describe('GET', () => {
      test('should respond with github url', async () => {
        const response = await request(app)
          .get('/auth/github')
          .query({ user: 'tester@test.com', oauth: 'testoauth2' })
        // .set('Authorization', `${token}`)
          .expect(302);
      });
    });
  });
});
