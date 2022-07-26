const validateDto = require('../middleware/validate-dto');
const {
  createRetailerController,
  login,
  registerSaleController,
  getAccumulatedCashback,
  listPurchasesController,
} = require('../controllers');
const { retailerSchema, saleSchema } = require('./schemas');

const routes = (router) => {
  router.post(
    '/create_retailer',
    validateDto(retailerSchema),
    createRetailerController,
  );
  router.post(
    '/register_sale',
    validateDto(saleSchema),
    registerSaleController,
  );

  router.get('/login', login);
  router.get('/cashback', getAccumulatedCashback);
  router.get('/list_purchases', listPurchasesController);
};

module.exports = routes;
