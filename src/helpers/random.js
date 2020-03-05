const crypto = require('crypto');

module.exports = bytes => {
  return crypto.randomBytes(bytes).toString('hex');
};
