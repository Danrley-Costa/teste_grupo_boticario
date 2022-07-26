const supertest = require("supertest")
const { assert } = require("chai")
const server = require('../../src/server')
const { dropCollection } = require("../../database/config")
const newRetailer = require("../fixture/createRetailer")

let app;

describe("Create retailer integration test", () => {
    before(async() =>{
        app = await server.start()
    })

    after(async() => {
        await server.stop()
    })

    afterEach(async () => {
        dropCollection('retailers')
    })

    it("Should return 201 when creating a new user  - POST: /create_retailer", async () =>{
        const {_body,statusCode } = await supertest(app)
        .post('/create_retailer')
        .send(newRetailer)
        .expect(201)
        assert.equal(_body.toString(),`Olá ${newRetailer.name} ${newRetailer.lastName} seu cadastro foi concluído com sucesso!`)
        assert.equal(statusCode, 201)
    })

    it("Should return 401 when typing wrong cpf  - POST: /create_retailer", async () =>{
        const retailerErrorCpf = {...newRetailer}
        retailerErrorCpf.cpf = "153.509.460-562222"
        const {_body } = await supertest(app)
        .post('/create_retailer')
        .send(retailerErrorCpf)
        .expect(401)
        assert.equal(_body.toString(),'cpf inválido')
    })

    it("Should return 400 if not passed the correct credentials - POST: /create_retailer ", async () =>{
        const retailerError = {...newRetailer}
        delete retailerError.email
        await supertest(app)
        .post('/create_retailer')
        .send(retailerError)
        .expect(400)
    })
})