const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    idProduct: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Em validação', 'Aprovado'],
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    percCashback: {
        type: String,
        required: true,
    },
    cashback: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model('Sale', saleSchema);
