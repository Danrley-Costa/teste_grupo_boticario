const supertest = require('supertest');
const { assert } = require('chai');
const sinon = require('sinon');
const server = require('../../src/server');
const { dropCollection } = require('../../database/config');
const newRetailer = require('../fixture/createRetailer');
const model = require('../../src/models/retailer');

let app;

const sandbox = sinon.createSandbox();

describe('Create retailer integration test', () => {
  before(async () => {
    app = await server.start();
  });

  after(async () => {
    await server.stop();
  });

  afterEach(async () => {
    dropCollection('retailers');
    sandbox.restore();
  });

  it('Should return 201 when creating a new user  - POST: /create_retailer', async () => {
    const { _body, statusCode } = await supertest(app)
      .post('/create_retailer')
      .send(newRetailer)
      .expect(201);
    assert.equal(
      _body.toString(),
      `Olá ${newRetailer.name} ${newRetailer.lastName} seu cadastro foi concluído com sucesso!`,
    );
    assert.equal(statusCode, 201);
  });

  it('Should return 401 when typing wrong cpf  - POST: /create_retailer', async () => {
    const retailerErrorCpf = { ...newRetailer };
    retailerErrorCpf.cpf = '153.509.460-562222';
    const { _body } = await supertest(app)
      .post('/create_retailer')
      .send(retailerErrorCpf)
      .expect(401);
    assert.equal(_body.toString(), 'cpf inválido');
  });

  it('Should return 400 if not passed the correct credentials - POST: /create_retailer ', async () => {
    const retailerError = { ...newRetailer };
    delete retailerError.email;
    await supertest(app)
      .post('/create_retailer')
      .send(retailerError)
      .expect(400);
  });

  it('Should return 500 error internal - POST: /create_retailer ', async () => {
    sandbox.stub(model.prototype, 'save').throws(new Error('Opss'));
    const retailer = { ...newRetailer };
    await supertest(app)
      .post('/create_retailer')
      .send(retailer)
      .expect(500);
  });

  it('Should return 500 error internal - POST: /create_retailer ', async () => {
    sandbox.stub(model.prototype, 'save').throws(new Error({ code: 11000 }));
    const retailer = { ...newRetailer };
    await supertest(app)
      .post('/create_retailer')
      .send(retailer)
      .expect(500);
  });
});
