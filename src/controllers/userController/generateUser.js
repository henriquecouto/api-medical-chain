const { User } = require('../../models/UserModel');
const { Patient } = require('../../models/PatientModel');
const { Doctor } = require('../../models/DoctorModel');
const saveUser = require('./saveUser');

module.exports = {
  doctor: async (dataUser, dataDoctor, res) => {
    const user = new User(dataUser);
    const doctor = new Doctor({ ...dataDoctor, user: user._id });

    const saveDoctor = () => {
      doctor.save(doctorError => {
        if (doctorError) {
          user.remove();
          res.status(500).json({ message: doctorError });
        }

        res.json({
          message: 'doctor user created with success',
          data: {
            ...dataUser,
            ...dataDoctor,
          },
        });
      });
    };

    saveUser(user, res, saveDoctor);
  },
  patient: async (dataUser, dataPatient, res) => {
    dataPatient.birthDate = new Date(dataPatient.birthDate);

    const user = new User(dataUser);
    const patient = new Patient({ ...dataPatient, user: user._id });

    const savePatient = () => {
      patient.save(patientError => {
        if (patientError) {
          user.remove();
          res.status(500).json({ message: patientError });
        }

        res.json({
          message: 'patient user created with success',
          data: {
            ...dataUser,
            ...dataPatient,
          },
        });
      });
    };

    saveUser(user, res, savePatient);
  },
  clerk: async (data, _, res) => {
    const user = new User(data);
    saveUser(user, res);
  },
};
