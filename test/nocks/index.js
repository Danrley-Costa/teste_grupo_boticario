require('dotenv').config()
const nock = require("nock")
const nocks = {}

nocks.getApiGb = (options) => {
    return nock('https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com:443', {"encodedQueryParams":true})
    .get('/v1/cashback')
    .query({"cpf":"15350946056"})
    .reply(200, {"statusCode":200,"body":{"credit":2021}}, [
        'Date',
        'Mon, 25 Jul 2022 21:10:38 GMT',
        'Content-Type',
        'application/json',
        'Content-Length',
        '41',
        'Connection',
        'close',
        'x-amzn-RequestId',
        'ebeec3bd-2438-4d9b-be68-fe9b653d2914',
        'x-amz-apigw-id',
        'V14AREwIIAMF5Ig=',
        'X-Amzn-Trace-Id',
        'Root=1-62df06ce-5415e75d1c4e57d07cd52552;Sampled=0'
    ]);
}

nocks.cleanAll = () => {
    nock.cleanAll();
}

module.exports = nocks