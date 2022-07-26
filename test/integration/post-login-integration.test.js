const supertest = require('supertest');
const { assert } = require('chai');
const server = require('../../src/server');
const { dropCollection } = require('../../database/config');
const Retailer = require('../../src/models/retailer');
const newRetailer = require('../fixture/createRetailer');

let app;

describe('Login integration test', () => {
  before(async () => {
    app = await server.start();
    await new Retailer(newRetailer).save();
  });

  after(async () => {
    await server.stop();
  });

  afterEach(async () => {
    dropCollection('retailers');
  });

  it('Should return 200 if login is successful - POST: /login', async () => {
    const { _body } = await supertest(app)
      .post('/login')
      .send({
        user: newRetailer.name,
        password: newRetailer.password,
      })
      .expect(200);
    assert.isTrue(_body.auth);
  });

  it('Should return 401 if not passed the correct credentials - POST: /login', async () => {
    const { _body } = await supertest(app)
      .post('/login')
      .send({
        user: newRetailer.name,
        password: '123',
      })
      .expect(401);
    assert.strictEqual(_body, 'Usuario ou senha invalido!');
  });
});
