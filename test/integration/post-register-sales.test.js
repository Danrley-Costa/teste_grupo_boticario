const supertest = require('supertest');
const { assert } = require('chai');
const server = require('../../src/server');
const { dropCollection } = require('../../database/config');
const newSale = require('../fixture/createSale');
const { createToken } = require('../../src/services/utils');

let app;

describe('Register sales integration test', () => {
    before(async () => {
        app = await server.start();
    });

    after(async () => {
        await server.stop();
    });

    afterEach(async () => {
        dropCollection('sales');
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
});
