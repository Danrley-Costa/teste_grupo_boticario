const { createRetailer } = require('../services/createRetailer');
const logger = require('../logger');

const createRetailerController = async (req, res) => {
  try {
    const { data, error } = await createRetailer(req.body);
    if (error) {
      logger.error('Error create retailer:', error);
      return res.status(401).json(error);
    }
    return res.status(201).json(data);
  } catch (err) {
    if (err.code === 11000) {
      const errorMessage = 'Já existe um CPF ou Email cadastrado para esse usuario!';
      logger.error('Error create retailer: %j', errorMessage);
      return res.status(400).json(errorMessage);
    }
    logger.error('Error create retailer:  %s', err);
    return res.status(500).json(err);
  }
};

module.exports = { createRetailerController };
