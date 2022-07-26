require('dotenv').config();
const axios = require('axios').default;
const { cpfValidate } = require('./utils');

const url = process.env.API_CASHBACK;
const config = {
  headers: { token: process.env.API_CASHBACK_TOKEN },
};

const getCahsBackAPI = async (cpf) => {
  const result = await cpfValidate(cpf);
  if (!result.error) {
    const { data, error } = await axios(`${url}?cpf=${result}`, config);
    if (error) {
      return {
        error: 'Erro ao conectar com API, favor tentar mas tarde!',
      };
    }
    return { data };
  }
  return { error: 'Digite um cpf valido!' };
};

module.exports = { getCahsBackAPI };
