const { connect, close, dropDatabase } = require('../database/config');

before('Override database url and add default token', async () => {
    await connect('TEST');
});

after('Remove tests database', async () => {
    close;
    dropDatabase();
});
