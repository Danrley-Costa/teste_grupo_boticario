require('dotenv').config();
const Sale = require('../models/sale');
const { apllyCashBack, cpfValidate } = require('./utils');

const createSale = async (idProduct, cpf, price) => {
  let status;
  const cpfValid = await cpfValidate(cpf);

  if (cpfValid.error) {
    return { error: cpfValid.error };
  }

  if (cpfValid === process.env.CPF_MASTER) {
    status = 'Aprovado';
  } else {
    status = 'Em validação';
  }

  const { percCashback, cashback } = await apllyCashBack(price);

  const sale = await new Sale({
    idProduct,
    price,
    status,
    cpf: cpfValid,
    percCashback,
    cashback,
  }).save();

  if (!sale) {
    return {
      error: 'A Compra não foi realizada, tente novamente mas tarde!',
    };
  }
  return { data: 'A Compra foi realizada com sucesso!' };
};

module.exports = { createSale };
