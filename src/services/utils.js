require('dotenv').config();
const { eachItem } = require('ajv/dist/compile/util');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const SECRET = process.env.SECRET;
const expiredToken = parseInt(process.env.EXPIREDTOKEN);

const createToken = user_id => {
    const token = jwt.sign({ user_id }, SECRET, { expiresIn: expiredToken });
    return token;
};

const verifyAuth = token => {
    const resul = jwt.verify(token, SECRET);
    return resul;
};

const formatData = sales => {
    return sales.map(item => ({
        ...item,
        month: moment(item.createdAt).format('MM-YYYY'),
    }));
};

const apllyCashBack = async price => {
    if (price <= process.env.PRERCENT10) {
        return { percCashback: '10%', cashback: price * 0.1 };
    } else if (
        price > process.env.PRERCENT15MINOR &&
        price < process.env.PRERCENT15MIJOR
    ) {
        return { percCashback: '15%', cashback: price * 0.15 };
    } else if (price >= process.env.PRERCENT20) {
        return { percCashback: '20%', cashback: price * 0.2 };
    }
};

const cpfValidate = cpf => {
    let cpfFormated = cpf.toString().replace(/\.|-/gm, '');
    if (cpfFormated.length === 11) {
        return cpfFormated;
    } else {
        return { error: 'cpf inválido' };
    }
};
module.exports = {
    createToken,
    verifyAuth,
    formatData,
    apllyCashBack,
    cpfValidate,
};
