const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const persist = require('./schedules/persist');

// MONGOOSE CONFIG
mongoose.connect('mongodb://localhost:27018/medical-chain', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', error => {
  console.log(error);
});
db.once('open', () => {
  console.log('db connected');
  persist();
});

// APP CONFIG
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use('/auth', require('./routes/user'));
app.use('/patients', require('./routes/patient'));
app.use('/doctors', require('./routes/doctor'));
app.use('/appointments', require('./routes/appointment'));

app.listen(3001, () => {
  console.log('App listening on http://localhost:3001');
});
