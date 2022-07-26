const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// eslint-disable-next-line new-cap
const ajv = new Ajv.default({ allErrors: true });
addFormats(ajv);

module.exports = ajv;
