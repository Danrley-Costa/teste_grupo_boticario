const { getCahsBackAPI } = require('../services/getAcumulateCashback');
const { verifyAuth } = require('../services/utils');
const logger = require('../logger');

const getAccumulatedCashback = async (req, res) => {
  const { cpf } = req.body;
  const token = req.headers['x-acces-token'];

  try {
    if (verifyAuth(token)) {
      const { data, error } = await getCahsBackAPI(cpf);
      if (error) {
        logger.error('Error get cashback:', error);
        return res.status(401).json(error);
      }
      return res.status(200).json(data.body);
    }
  } catch (error) {
    logger.error('Error get cashback:', error);
    return res.status(500).json(error);
  }
};

module.exports = { getAccumulatedCashback };
