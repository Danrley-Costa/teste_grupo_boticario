const { listPurchases } = require('../services/listPurchases');
const { verifyAuth } = require('../services/utils');
const logger = require('../logger');

const listPurchasesController = async (req, res) => {
  const token = req.headers['x-acces-token'];

  try {
    if (verifyAuth(token)) {
      const { data, error } = await listPurchases(req.body);
      if (error) {
        logger.error('Error list purchases:', error);
        return res.status(401).json(error);
      }
      return res.status(200).json(data);
    }
    return res.status(401);
  } catch (err) {
    logger.error('Error list purchases:', err);
    return res.status(500).json(err.name);
  }
};

module.exports = { listPurchasesController };
