const isEquivalent = require('../helpers/isEquivalent');
const parseEthResult = require('../helpers/parseEthResult');
const { encrypt } = require('../helpers/crypto');
const { Appointment } = require('../models/AppointmentModel');
const eth = require('../helpers/eth');
const {
  ownerAccount,
  contracts: { clinicalData: clinicalDataContract },
} = require('../config/eth.json');

const loadTransactions = async () => {
  const aptms = await Appointment.find({ blocked: false })
    .populate({ path: 'doctor', populate: { path: 'user' } })
    .populate({ path: 'patient', populate: { path: 'user' } });

  return aptms.map(data => {
    const transaction = {
      id: data._id,
      data: {
        patient: {
          name: data.patient.user.name,
          occupation: data.patient.occupation,
          gender: data.patient.gender,
          birthDate: (
            new Date(data.patient.birthDate).getTime() / 1000
          ).toFixed(0),
        },
        doctor: {
          name: data.doctor.user.name,
          crm: data.doctor.crm,
          specialization: data.doctor.specialization,
        },
        appointment: {
          exams: data.exams,
          symptons: data.symptoms,
          diagnosis: data.diagnosis,
          registrationDate: (
            new Date(data.registrationDate).getTime() / 1000
          ).toFixed(0),
        },
      },
    };

    return transaction;
  });
};

const makeTransactions = async transactions => {
  const contract = new eth.Contract(clinicalDataContract.abi);

  transactions.forEach(async tx => {
    try {
      const deployedContract = await contract
        .deploy({
          data: clinicalDataContract.bytecode,
        })
        .send({ from: ownerAccount, gas: 6721975, gasPrice: 20000000000 });

      await deployedContract.methods
        .save(tx.data)
        .send({ from: ownerAccount, gas: 6721975, gasPrice: 20000000000 });
      const result = parseEthResult(
        await deployedContract.methods.get().call()
      );

      await Appointment.updateOne(
        { _id: tx.id },
        {
          blocked: true,
          blockedDate: Date.now(),
          blockedCorrect: isEquivalent(result, tx.data),
          blockedContractAddress: encrypt(deployedContract._address),
        }
      );

      console.log('job succeeded');
    } catch (error) {
      console.log('an error has ocurred');
      console.log(error);
    }
    console.log('job finished');
  });
};

module.exports = {
  loadTransactions,
  makeTransactions,
};
