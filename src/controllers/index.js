const { createRetailerController } = require('./createRetailer')
const { login } = require('./login')
const {registerSaleController} = require('./registerSales')
const { getAccumulatedCashback } = require('./creditCashback')
const { listPurchasesController } = require('./listPurchases')

module.exports = {
    createRetailerController,
    login,
    registerSaleController,
    getAccumulatedCashback,
    listPurchasesController
}