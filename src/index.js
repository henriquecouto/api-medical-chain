const express = require('express');
const bigchaindb = require('bigchaindb-driver');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');

// APP CONFIGU
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// BIGCHAIN CONFIG
const BIGCHAIN_PATH = 'http://localhost:9984/api/v1/';
const conn = new bigchaindb.Connection(BIGCHAIN_PATH);

// MONGOOSE CONFIG
mongoose.connect('mongodb://localhost:27018/medical-chain', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => {
  console.log('db connected');
});

// app.get('/', async (req, res) => {
//   const assets = await conn.searchAssets('');
//   res.send(assets);
// });

app.post('/', userController.createUser);

app.listen(3000, () => {
  console.log('App listening on http://localhost:3000');
});
