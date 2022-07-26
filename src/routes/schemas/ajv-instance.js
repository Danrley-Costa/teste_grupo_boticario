const Ajv = require('ajv');
const addFormats = require('ajv-formats');

let ajv = new Ajv.default({ allErrors: true });
addFormats(ajv);

module.exports = ajv;
