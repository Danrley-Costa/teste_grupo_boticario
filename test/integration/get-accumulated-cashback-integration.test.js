const supertest = require('supertest');
const { assert } = require('chai');
const server = require('../../src/server');
const nocks = require('../nocks');
const { createToken } = require('../../src/services/utils');

let app;

describe('Acumulate cash back integration test', () => {
    before(async () => {
        app = await server.start();
        nocks.cleanAll();
    });

    after(async () => {
        await server.stop();
    });

    afterEach(async () => {
        nocks.cleanAll();
    });

    it('Should return 200 if it draws the retailer credits - GET: /cashback', async () => {
        const apiGb = nocks.getApiGb();
        const token = createToken('1234');
        await supertest(app)
            .get('/cashback')
            .set({ 'x-acces-token': token })
            .send({
                cpf: '15350946056',
            })
            .expect(200);
        assert.isTrue(apiGb.isDone());
    });

    it("Should return 401 if you don't pass a valid cpf - GET: /cashback", async () => {
        nocks.getApiGb();
        const token = createToken('1234');
        await supertest(app)
            .get('/cashback')
            .set({ 'x-acces-token': token })
            .send({
                cpf: '15350946',
            })
            .expect(401);
    });
});
