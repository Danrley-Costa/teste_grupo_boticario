const supertest = require('supertest');
const sinon = require('sinon');
const server = require('../../src/server');

const { dropCollection } = require('../../database/config');
const newSale = require('../fixture/createSale');
const { createToken } = require('../../src/services/utils');
const Sale = require('../../src/models/sale');

let app;
const sandbox = sinon.createSandbox();

describe('Register sales integration test', () => {
  before(async () => {
    app = await server.start();
    const sale = { ...newSale };
    sale.status = 'Em validação';
    sale.percCashback = '10%';
    sale.cashback = 10;

    await new Sale(sale).save();
  });

  after(async () => {
    await server.stop();
  });

  afterEach(async () => {
    dropCollection('retailers');
    sandbox.restore();
  });

  it('Should return 200 when listing purchases - GET: /list_purchases', async () => {
    const token = createToken('1234');
    await supertest(app)
      .get('/list_purchases')
      .set({ 'x-acces-token': token })
      .send({ cpf: newSale.cpf })
      .expect(200);
  });

  it("Should return 401 if you don't pass the correct credentials - GET: /list_purchases", async () => {
    const token = createToken('1234');
    await supertest(app)
      .get('/list_purchases')
      .set({ 'x-acces-token': token })
      .expect(401);
  });

  it('Should return 500 when listing purchases error internal - GET: /list_purchases', async () => {
    sandbox.stub(Sale, 'find').returns(new Error('Opss'));
    const token = createToken('1234');
    await supertest(app)
      .get('/list_purchases')
      .set({ 'x-acces-token': token })
      .send({ cpf: newSale.cpf })
      .expect(500);
  });
});
