const schedule = require('node-schedule');
const bigchaindb = require('bigchaindb-driver');
const { Appointment } = require('../models/AppointmentModel');
const { bigchainConn } = require('../helpers/constants');
const { sendNotification } = require('../helpers/notify');
const isEquivalent = require('../helpers/isEquivalent');

const keyPair = new bigchaindb.Ed25519Keypair();

const loadTransactions = async () => {
  const aptms = await Appointment.find({ blocked: false })
    .populate('doctor')
    .populate('patient');

  return aptms.map(data => {
    const transaction = bigchaindb.Transaction.makeCreateTransaction(
      data,
      { search: 'all' },
      [
        bigchaindb.Transaction.makeOutput(
          bigchaindb.Transaction.makeEd25519Condition(keyPair.publicKey)
        ),
      ],
      keyPair.publicKey
    );

    return bigchaindb.Transaction.signTransaction(
      transaction,
      keyPair.privateKey
    );
  });
};

const makeTransactions = async transactions => {
  transactions.forEach(async transaction => {
    try {
      const aptmId = transaction.asset.data._id;
      const { tokensApp } = transaction.asset.data.patient;
      const alreadyBlocked = await bigchainConn.searchAssets(aptmId);
      if (alreadyBlocked.length) {
        await Appointment.updateOne({ _id: aptmId }, { blocked: true });
        return false;
      }

      const sendedTransaction = await bigchainConn.postTransactionCommit(
        transaction
      );

      await Appointment.updateOne(
        { _id: aptmId },
        {
          blocked: true,
          blockedCorrect: isEquivalent(
            sendedTransaction.asset.data,
            transaction.asset.data.toObject()
          ),
        }
      );

      sendNotification(
        tokensApp,
        'Nova consulta',
        'Há uma nova consulta disponível para visualização!',
        aptmId
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });
};

module.exports = () => {
  return schedule.scheduleJob('*/60 * * * * *', async () => {
    const transactions = await loadTransactions();
    makeTransactions(transactions);
  });
};
