const { authClient } = require('../services/authClient');
const logger = require('../logger');

const login = async (req, res) => {
  const { user, password } = req.body;
  try {
    const { data, error } = await authClient(user, password);
    if (error) {
      logger.error('Error login:', error);
      return res.status(401).json(error.message);
    }
    res.status(200).json({ auth: true, token: data });
  } catch (err) {
    logger.error('Error login:', err);
    res.status(500).json(err);
  }
};

module.exports = { login };
