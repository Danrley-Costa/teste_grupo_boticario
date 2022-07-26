require('dotenv').config();
const moment = require('moment');
const { formatData } = require('./utils');

const addCashBack = async (sales) => {
  const array = await formatData(sales);
  const nowData = moment().format('MM-YYYY');
  const filtrados = array.filter((item) => item.month === nowData);
  const cashback = filtrados
    .map((item) => item.cashback)
    .reduce((prev, curr) => prev + curr, 0);
  const cashAdd = { ...array, cashback };
  return cashAdd;
};

module.exports = { addCashBack };
