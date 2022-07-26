const server = require('./src/server');
const database = require('./database/config');
const pkg = require('./package.json');
const logger = require('./src/logger');

process.title = pkg.name;

const shutdown = async () => {
    try {
        logger.info('Gracefully shutdown in progress');
        await server.stop();
        await database.close();
        process.exit(0);
    } catch (error) {
        logger.error('[APP] Exit failed', err);
        throw err;
    }
};

process
    .on('SIGTERM', shutdown)
    .on('SIGINT', shutdown)
    .on('SINGHUP', shutdown)
    .on('uncaughtException', error => {
        logger.error('uncaughtException caught the error: ', error);
        throw error;
    })
    .on('unhandledRejection', (error, promise) => {
        logger.error(
            `unhandledRejection Rejection at: Promise ${promise} reason: ${error}`,
        );
        throw error;
    })
    .on('exit', code => {
        logger.error(`Node process exit with code: ${code}`);
    });

(async () => {
    try {
        await database.connect('DEV');
        await server.start();
        logger.info('[APP] initialized SUCCESFULLY');
    } catch (err) {
        logger.error('[APP] initialization failed', err);
        throw err;
    }
})();
