const request = require('supertest');
const server = 'http://localhost:4000';
const fs = require('fs');
const path = require('path');
const { isTypedArray } = require('util/types');


describe('Route integration', () => {
    describe('/', () => {
        describe('GET', () => {
            //Testing to ensure server responds with status 200 and text/html content type when a GET request is sent to the main page
            it('responds with 200 status and text/html content type', () => {
                return request(server)
                    .get('/')
                    .expect('Content-Type', /text\/html/)
                    .expect(200)
            })
        })
    })
})