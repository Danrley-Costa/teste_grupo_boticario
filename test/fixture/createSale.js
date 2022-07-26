const Chance = require('chance');
const chance = new Chance();

const newSale = {
	"idProduct": chance.integer({ min: 0, max: 100 }),
	"price":500.00,
	"cpf": chance.cpf()
}


module.exports = newSale