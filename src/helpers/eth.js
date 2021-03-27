const Web3 = require('web3');

const provider = new Web3.providers.WebsocketProvider('http://localhost:7545');
const { eth } = new Web3(provider);

module.exports = eth;
