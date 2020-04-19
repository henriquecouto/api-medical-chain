const { Appointment } = require('../../models/AppointmentModel');
const dataLoaded = require('../../helpers/dataLoaded');
const { bigchainConn } = require('../../helpers/constants');
const notifyMedication = require('../../schedules/notifyMedication');

exports.createAppointment = async (req, res) => {
  const data = req.body;

  const aptm = new Appointment(data);

  await aptm.save(error => {
    if (error) {
      return res.status(500).json({ message: error });
    }

    return res.json({
      message: 'appointment created with success',
      data,
    });
  });
};

exports.getAppointments = async (req, res) => {
  Appointment.find(dataLoaded(res))
    .populate('patient')
    .populate('doctor');
};

exports.getAppointment = async (req, res) => {
  const { id } = req.params;
  Appointment.findById(id, dataLoaded(res))
    .populate('doctor')
    .populate('patient');
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  Appointment.findByIdAndUpdate(
    id,
    update,
    { new: true, runValidators: true },
    dataLoaded(res)
  ).populate('user');
};

exports.initTreatment = async (req, res) => {
  const { id, medicationId } = req.body;

  const {
    data: { treatment },
  } = (await bigchainConn.searchAssets(id))[0];

  const medication = treatment.find(v => v._id === medicationId);

  if (!medication) {
    res
      .status(400)
      .json({ message: "medication doesn't exists in appointment" });
  }

  notifyMedication(medication);

  res.json(medication);
};

exports.getBlockedAppointment = async (req, res) => {
  const { id } = req.params;
  const assets = await bigchainConn.searchAssets(id);
  res.json({ assets });
};

exports.getBlockedAll = async (req, res) => {
  const assets = await bigchainConn.searchMetadata('all');
  res.json({ assets });
};
