const { verifyAuth } = require('../services/utils');
const { createSale } = require('../services/createSale');
const logger = require('../logger');

const registerSaleController = async (req, res) => {
  const { idProduct, cpf, price } = req.body;
  const token = req.headers['x-acces-token'];
  try {
    if (verifyAuth(token)) {
      const { data, error } = await createSale(idProduct, cpf, price);

      if (error) {
        logger.error('Error create Sale: %j', error);
        return res.status(401).json(error);
      }
      return res.status(201).json(data);
    }
    return res.status(401);
  } catch (err) {
    logger.error('Error create Sale: %j', err);
    res.status(500).json(err.name);
  }
};

module.exports = { registerSaleController };
