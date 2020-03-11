const schedule = require('node-schedule');

module.exports = ({ name, interval, recurrencies }) => {
  const actual = new Date(Date.now());
  const start = new Date(actual.getTime() + interval * 60000);
  const end = new Date(
    start.getTime() + ((24 / interval) * recurrencies - 1) * interval * 60000
    // 86400000
    // 3600000
  );

  //  ((24000/8)*4-1000)*8

  // 12 * 8 * 1000 / 24000
  const a = Math.random().toFixed(1);

  console.log({ start, end });

  console.log('start ', a, actual);
  return schedule.scheduleJob(
    { rule: `*/${interval} * * * *`, start, end },
    async () => {
      console.log('notify ', a, new Date());
      // const transactions = await loadTransactions();
      // makeTransactions(transactions);
    }
  );
};
