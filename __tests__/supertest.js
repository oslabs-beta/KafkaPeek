const { io } = require('socket.io-client');
const request = require('supertest');
const app = require('../server/server');



describe('Route integration', () => {

    describe('/', () => {
        describe('GET', () => {
            //Testing to ensure server responds with status 200 and text/html content type when a GET request is sent to the main page
            it('responds with 200 status and text/html content type',  () => {
                return request(app)
                    .get('/')
                    .expect('Content-Type', /text\/html/)
                    .expect(200)
            });
        });
    });
});