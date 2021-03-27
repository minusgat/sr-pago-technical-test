const knexjs = require('knex');
const config = require('../config');

const db = knexjs({
  client: 'mysql',
  connection: {
    user: config.db.user,
    password: '3A0dgJ22Eq8jvCws',
    database: config.db.name,
  },
  pool: { min: 0, max: 10 },
});

module.exports = db;
