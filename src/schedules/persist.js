const schedule = require('node-schedule');
const persistEthereum = require('./persistEthereum');

module.exports = async () => {
  console.log('job scheduled');
  return schedule.scheduleJob('*/10 * * * * *', async () => {
    const transactions = await persistEthereum.loadTransactions();
    persistEthereum.makeTransactions(transactions);
  });
};
