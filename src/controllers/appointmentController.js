const { Appointment } = require('../models/AppointmentModel');

exports.createAppointment = async (req, res) => {
  const data = req.body;

  const aptm = new Appointment(data);

  await aptm.save(error => {
    if (error) {
      res.status(500).json({ message: error });
    }

    res.json({
      message: 'appointment created with success',
      data,
    });
  });
};
