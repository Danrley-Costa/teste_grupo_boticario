const { assert } = require('chai');
const moment = require('moment');
const Chance = require('chance');
const {
  createToken,
  verifyAuth,
  formatData,
  apllyCashBack,
  cpfValidate,
} = require('../../src/services/utils');

const chance = new Chance();

const newRetailer = require('../fixture/createRetailer');

describe('Utils unit tests', () => {
  before(async () => {});

  after(async () => {});

  afterEach(async () => {});

  it('Should create an access token - createToken', async () => {
    const token = createToken('1234');
    assert.isOk(token);
  });
  it('Should validate an access through an access token - verifyAuth', async () => {
    const expect = chance.d20();
    const token = createToken(expect);
    const { userId } = verifyAuth(token);
    assert.equal(userId, expect);
  });
  it('Should validate a cpf - cpfValidate', async () => {
    const expect = newRetailer.cpf;
    const cpfValid = cpfValidate(expect);
    const cpfFormated = expect.toString().replace(/\.|-/gm, '');
    assert.equal(cpfValid, cpfFormated);
  });
  it('Should format an array with timestemp to readable time - formatData', async () => {
    const array = [
      {
        idProduct: 1234523216,
        price: 1200,
        status: 'Em validação',
        cpf: '60874760321',
        percCashback: '15%',
        cashback: 180,
        createdAt: '2022-07-26T01:23:16.647Z',
      },
      {
        idProduct: 1234523216,
        price: 1200,
        status: 'Em validação',
        cpf: '60874760321',
        percCashback: '15%',
        cashback: 180,
        createdAt: '2022-06-26T01:23:18.883Z',
      },
    ];
    const expect = moment(array[0].createdAt).format('MM-YYYY');
    const arrayFormated = formatData(array);
    assert.equal(arrayFormated[0].month, expect);
  });
  it('filter month from array - apllyCashBack 10%', async () => {
    const percent10 = { percCashback: '10%' };
    const apllyCashback = await apllyCashBack(200);
    assert.equal(apllyCashback.percCashback, percent10.percCashback);
  });
  it('filter month from array - apllyCashBack 15%', async () => {
    const percent15 = { percCashback: '15%' };
    const apllyCashback = await apllyCashBack(1200);
    assert.equal(apllyCashback.percCashback, percent15.percCashback);
  });
  it('filter month from array - apllyCashBack 20%', async () => {
    const percent20 = { percCashback: '20%' };
    const apllyCashback = await apllyCashBack(1700);
    assert.equal(apllyCashback.percCashback, percent20.percCashback);
  });
});
