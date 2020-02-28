const express = require('express');
const bigchaindb = require('bigchaindb-driver');

const app = express();
const BIGCHAIN_PATH = 'http://localhost:9984/api/v1/';
const conn = new bigchaindb.Connection(BIGCHAIN_PATH);

app.get('/', async (req, res) => {
  const assets = await conn.searchAssets('');
  res.send(assets);
});

app.listen(3000, () => {
  console.log('App listening on port http://localhost:3000');
});
