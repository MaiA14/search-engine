
const request = require('supertest');
const expect = require('chai').expect;

const API_URL = 'http://localhost:4000/api'

describe('Check GET  film', () => {
  it('should successfully get single film', (done) => {
    request(API_URL)
      .get('/films/1/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });
});


