const bigchaindb = require('bigchaindb-driver');

// BIGCHAIN CONFIG
const BIGCHAIN_PATH = 'http://localhost:9984/api/v1/';
const bigchainConn = new bigchaindb.Connection(BIGCHAIN_PATH);

module.exports = {
  bigchainConn,
};
