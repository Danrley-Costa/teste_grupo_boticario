require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');

const { SECRET } = process.env;
const expiredToken = parseInt(process.env.EXPIREDTOKEN, 10);

const createToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET, { expiresIn: expiredToken });
  return token;
};

const verifyAuth = (token) => {
  const resul = jwt.verify(token, SECRET);
  return resul;
};

const formatData = (sales) => sales.map((item) => ({
  ...item,
  month: moment(item.createdAt).format('MM-YYYY'),
}));

const apllyCashBack = async (price) => {
  if (price <= process.env.PRERCENT10) {
    return { percCashback: '10%', cashback: price * 0.1 };
  } if (
    price > process.env.PRERCENT15MINOR
        && price < process.env.PRERCENT15MIJOR
  ) {
    return { percCashback: '15%', cashback: price * 0.15 };
  } if (price >= process.env.PRERCENT20) {
    return { percCashback: '20%', cashback: price * 0.2 };
  }
};

const cpfValidate = (cpf) => {
  const cpfFormated = cpf.toString().replace(/\.|-/gm, '');
  if (cpfFormated.length === 11) {
    return cpfFormated;
  }
  return { error: 'cpf inválido' };
};
module.exports = {
  createToken,
  verifyAuth,
  formatData,
  apllyCashBack,
  cpfValidate,
};
