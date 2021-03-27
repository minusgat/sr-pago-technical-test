const knexjs = require('knex');
const config = require('../config');

const db = knexjs({
  client: 'mysql',
  connection: {
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    /*socketPath:config.db.socketPath*/
  },
  pool: { min: 0, max: 10 },
});

module.exports = db;
