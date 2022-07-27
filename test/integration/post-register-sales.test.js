const supertest = require('supertest');
const { assert } = require('chai');
const sinon = require('sinon');
const server = require('../../src/server');
const { dropCollection } = require('../../database/config');
const newSale = require('../fixture/createSale');
const { createToken } = require('../../src/services/utils');
const model = require('../../src/models/sale');

let app;
const sandbox = sinon.createSandbox();

describe('Register sales integration test', () => {
  before(async () => {
    app = await server.start();
  });

  after(async () => {
    await server.stop();
  });

  afterEach(async () => {
    dropCollection('sales');
    sandbox.restore();
  });

  it('Should return 201 when creating a new sale - POST: /register_sale', async () => {
    const token = createToken('1234');
    const { statusCode, _body } = await supertest(app)
      .post('/register_sale')
      .set({ 'x-acces-token': token })
      .send(newSale)
      .expect(201);
    assert.equal(statusCode, 201);
    assert.equal(_body, 'A Compra foi realizada com sucesso!');
  });

  it('Should return 400 if not passed the correct credentials - POST: /register_sale', async () => {
    const newSaleError = { ...newSale };
    delete newSaleError.price;
    await supertest(app)
      .post('/register_sale')
      .send(newSaleError)
      .expect(400);
  });

  it('Should return 500 if register sale error internal  - POST: /register_sale', async () => {
    sandbox.stub(model.prototype, 'save').throws(new Error('Opss'));
    const token = createToken('1234');
    await supertest(app)
      .post('/register_sale')
      .set({ 'x-acces-token': token })
      .send(newSale)
      .expect(500);
  });
});
