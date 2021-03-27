const convict = require('convict');

const config = convict({
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'SR_PAGO_PORT',
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'localhost',
      env: 'DB_HOST',
    },
    socketPath: {
      doc: 'Database Socket Path',
      format: '*',
      default: '/cloudsql/direct-shadow-279022:us-central1:test',
      env: 'CLOUD_SQL_CONNECTION',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'srPagoTest',
      env: 'DB_NAME',
    },
    user: {
      doc: 'Database user',
      format: String,
      default: 'srPagoTest',
      env: 'DB_USER',
    },
    port: {
      doc: 'database port',
      format: 'port',
      // note that this can be overriden depending on what environment you run on
      // please check out local.json and test.json and production.json
      default: 3306,
      env: 'DB_PORT',
    },
    password: {
      doc: 'database password',
      format: '*',
      default: null,
      env: 'DB_PASSWORD',
    },
  },
  key: {
    jwtSecret: {
      doc: 'JWT secret key',
      format: function check(val) {
        if (!/^[a-fA-F0-9]{64}$/.test(val)) {
          throw new Error('must be a 64 character hex key')
        }
      },
      default: '3cec609c9bc601c047af917a544645c50caf8cd606806b4e0a23312441014deb',
      env: 'JWT_SECRET_KEY',
    }
  },
});

config.validate({allowed: 'strict'});

module.exports = {
  ...config.getProperties(),
};
