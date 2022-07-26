const mongoose = require('mongoose');
require('dotenv').config();
const logger = require('../src/logger');
const urls = {
    DEV: process.env.URL_DB,
    TEST: process.env.URL_DB_TEST,
};

const connect = async url => {
    mongoose.connect(urls[url], {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    logger.info('DB connect successfully to server');
};

const close = async () => {
    await mongoose.connection.close();
    logger.info('DB disconnect successfully to server');
};

const dropCollection = collection => {
    mongoose.connection.db.dropCollection(collection);
    return;
};

const dropDatabase = () => {
    mongoose.connection.db.dropDatabase();
};
module.exports = { connect, close, dropCollection, dropDatabase };
