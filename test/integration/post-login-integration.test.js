const supertest = require('supertest');
const { assert } = require('chai');
const sinon = require('sinon');
const server = require('../../src/server');
const { dropCollection } = require('../../database/config');
const Retailer = require('../../src/models/retailer');
const newRetailer = require('../fixture/createRetailer');

let app;
const sandbox = sinon.createSandbox();

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
    sandbox.restore();
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

  it('Should return 500 if login is error internal - POST: /login', async () => {
    sandbox.stub(Retailer, 'findOne').throws(new Error('Opss'));
    await supertest(app)
      .post('/login')
      .send({
        user: newRetailer.name,
        password: newRetailer.password,
      })
      .expect(500);
  });
});
