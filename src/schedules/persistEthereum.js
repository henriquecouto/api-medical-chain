const Web3 = require('web3');
const isEquivalent = require('../helpers/isEquivalent');
const parseEthResult = require('../helpers/parseEthResult');
const { Appointment } = require('../models/AppointmentModel');

const provider = new Web3.providers.WebsocketProvider('http://localhost:7545');
const { eth } = new Web3(provider);

const clinicalDataContract = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'minter',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'occupation',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'gender',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'birthDate',
                type: 'uint256',
              },
            ],
            internalType: 'struct Patient',
            name: 'patient',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'crm',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'specialization',
                type: 'string',
              },
            ],
            internalType: 'struct Doctor',
            name: 'doctor',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string[]',
                name: 'exams',
                type: 'string[]',
              },
              {
                internalType: 'string[]',
                name: 'symptons',
                type: 'string[]',
              },
              {
                internalType: 'string[]',
                name: 'diagnosis',
                type: 'string[]',
              },
              {
                internalType: 'uint256',
                name: 'registrationDate',
                type: 'uint256',
              },
            ],
            internalType: 'struct Appointment',
            name: 'appointment',
            type: 'tuple',
          },
        ],
        internalType: 'struct ClinicalDataType',
        name: '_clinicalData',
        type: 'tuple',
      },
    ],
    name: 'save',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'get',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'occupation',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'gender',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'birthDate',
                type: 'uint256',
              },
            ],
            internalType: 'struct Patient',
            name: 'patient',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'crm',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'specialization',
                type: 'string',
              },
            ],
            internalType: 'struct Doctor',
            name: 'doctor',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string[]',
                name: 'exams',
                type: 'string[]',
              },
              {
                internalType: 'string[]',
                name: 'symptons',
                type: 'string[]',
              },
              {
                internalType: 'string[]',
                name: 'diagnosis',
                type: 'string[]',
              },
              {
                internalType: 'uint256',
                name: 'registrationDate',
                type: 'uint256',
              },
            ],
            internalType: 'struct Appointment',
            name: 'appointment',
            type: 'tuple',
          },
        ],
        internalType: 'struct ClinicalDataType',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_reader',
        type: 'address',
      },
    ],
    name: 'get',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'occupation',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'gender',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'birthDate',
                type: 'uint256',
              },
            ],
            internalType: 'struct Patient',
            name: 'patient',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'crm',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'specialization',
                type: 'string',
              },
            ],
            internalType: 'struct Doctor',
            name: 'doctor',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string[]',
                name: 'exams',
                type: 'string[]',
              },
              {
                internalType: 'string[]',
                name: 'symptons',
                type: 'string[]',
              },
              {
                internalType: 'string[]',
                name: 'diagnosis',
                type: 'string[]',
              },
              {
                internalType: 'uint256',
                name: 'registrationDate',
                type: 'uint256',
              },
            ],
            internalType: 'struct Appointment',
            name: 'appointment',
            type: 'tuple',
          },
        ],
        internalType: 'struct ClinicalDataType',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];
const contractAddress = '0x494e9DBbBe29451BE988D86B249FB0Bc88ba61eA';
const from = '0x9F1Fd3F74855334A506e1C64Bd8d3b530eD539f4';

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
  const contract = new eth.Contract(clinicalDataContract, contractAddress);

  transactions.forEach(async tx => {
    console.log('job initiated');
    try {
      await contract.methods
        .save(tx.data)
        .send({ from, gas: 1000000, gasPrice: 20000000000 });
      const result = parseEthResult(await contract.methods.get().call());

      await Appointment.updateOne(
        { _id: tx.id },
        {
          blocked: true,
          blockedDate: Date.now(),
          blockedCorrect: isEquivalent(result, tx.data),
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
