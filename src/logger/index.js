
require('dotenv').config()
const pino = require("pino")({
    level: process.env.LEVEL,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            levelFirst: true,
            translateTime: true,
        }
    },
})

module.exports = pino