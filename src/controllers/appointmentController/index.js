const { Appointment } = require('../../models/AppointmentModel');
const dataLoaded = require('../../helpers/dataLoaded');

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
  Appointment.find(dataLoaded(res)).populate('user');
};

exports.getAppointment = async (req, res) => {
  const { id } = req.params;
  Appointment.findById(id, dataLoaded(res)).populate('user');
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
