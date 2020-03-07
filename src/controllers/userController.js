const { User } = require('../models/UserModel');
const { Patient } = require('../models/PatientModel');
const { Doctor } = require('../models/DoctorModel');
const random = require('../helpers/random');

const saveUser = (
  user,
  res,
  next = () => {
    res.json({ message: 'User created with success', user });
  }
) => {
  console.log('aaa');

  user.save(userError => {
    if (userError) {
      res.status(500).json({ message: userError });
    }
    next();
  });
};

const generateUser = {
  doctor: async (dataUser, dataDoctor, res) => {
    const user = new User(dataUser);
    const doctor = new Doctor({ ...dataDoctor, user_id: user._id });

    const saveDoctor = () => {
      doctor.save(doctorError => {
        if (doctorError) {
          user.remove();
          res.status(500).json({ message: doctorError });
        }

        res.json({
          message: 'Doctor user created with success!',
          ...dataUser,
          ...dataDoctor,
        });
      });
    };

    saveUser(user, res, saveDoctor);
  },
  patient: async (dataUser, dataPatient, res) => {
    dataPatient.birthDate = new Date(dataPatient.birthDate);

    const user = new User(dataUser);
    const patient = new Patient({ ...dataPatient, user_id: user._id });

    const savePatient = () => {
      patient.save(patientError => {
        if (patientError) {
          user.remove();
          res.status(500).json({ message: patientError });
        }

        res.json({
          message: 'Patient user created with success!',
          ...dataUser,
          ...dataPatient,
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

exports.createUser = async (req, res) => {
  const { user, info } = req.body;
  const login = `${user.name.split(' ')[0]}-${random(3)}`.toLowerCase();
  const password = random(6);
  await generateUser[user.type](
    {
      login,
      password,
      ...user,
    },
    info,
    res
  );
};
