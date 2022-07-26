const Sale = require('../models/sale');

const { addCashBack } = require('./addCashBack');
const { cpfValidate } = require('./utils');

const listPurchases = async (body) => {
  const { cpf } = body;
  if (!cpf) {
    return { error: { message: 'Insira um cpf para listar as compras!' } };
  }

  const cpfValid = cpfValidate(cpf);
  if (cpfValid.error) {
    return { error: cpfValid.error };
  }
  const sales = await Sale.find({ cpfValid }, {
    idProduct: 1,
    price: 1,
    status: 1,
    cpf: 1,
    percCashback: 1,
    cashback: 1,
    createdAt: 1,
    _id: 0,
  }).lean();

  if (!sales) {
    return { error: { message: 'Error ao listar compras!' } };
  }

  if (sales.length === 0) {
    return {
      data: { message: 'Não existe compras para o cpf informado!' },
    };
  }

  const cashAplly = await addCashBack(sales);

  return { data: cashAplly };
};

module.exports = { listPurchases };
