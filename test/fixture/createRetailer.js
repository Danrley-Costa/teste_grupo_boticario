const Chance = require('chance');
const chance = new Chance();

const newRetailer = {
    name: chance.name(),
    lastName: chance.name(),
    cpf: chance.cpf(),
    email: chance.email({ domain: 'teste.com' }),
    password: chance.string({ length: 5 }),
};

module.exports = newRetailer;
