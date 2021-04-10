const schedule = require('node-schedule');
const persist = require('./persistBigchainDB');

module.exports = async () => {
  console.log('job scheduled');
  return schedule.scheduleJob('*/10 * * * * *', async () => {
    try {
      const transactions = await persist.loadTransactions();
      if (transactions.length) {
        persist.makeTransactions(transactions);
      }
    } catch (error) {
      console.log({ error });
    }
  });
};
