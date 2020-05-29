const md5 = require('md5');

const { Appointment } = require('../../models/AppointmentModel');
const dataLoaded = require('../../helpers/dataLoaded');
const { bigchainConn } = require('../../helpers/constants');

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

exports.update = async (req, res) => {
  const { appointmentId, medicationId, update } = req.body;

  // {param: 'notifyCorrect', value: true}
  // {param: 'takeNumbers', value: 3}

  try {
    const appointment = await Appointment.findById(appointmentId);

    const medicationIndex = appointment.treatment.findIndex(
      v => String(v._id) === medicationId
    );

    const medication = appointment.treatment.find(
      v => String(v._id) === medicationId
    );

    medication[update.param] = update.value;

    appointment.treatment[medicationIndex] = medication;

    await Appointment.findByIdAndUpdate(appointmentId, appointment);

    return res.send({ message: 'medication updated' });
  } catch (error) {
    return res.send({ error: true, message: error });
  }
};

exports.getBlockedAppointment = async (req, res) => {
  const { id } = req.params;
  const assets = await bigchainConn.searchAssets(id);
  res.json({ assets, md5: md5(JSON.stringify(assets)) });
};

exports.getBlockedAll = async (req, res) => {
  const assets = await bigchainConn.searchMetadata('all');
  res.json({ assets });
};
