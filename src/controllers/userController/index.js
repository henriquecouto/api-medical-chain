const jwt = require('jsonwebtoken');
const random = require('../../helpers/random');
const generateUser = require('./generateUser');
const authConfig = require('../../config/auth');
const { User } = require('../../models/UserModel');
const { Patient } = require('../../models/PatientModel');
const { Doctor } = require('../../models/DoctorModel');

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

exports.login = async (req, res) => {
  const { login, password, tokenApp } = req.body;

  const user = await User.findOne({ login });
  if (!user) {
    return res.status(400).json({ message: 'user not found' });
  }

  if (password !== user.password) {
    return res.status(400).json({ message: 'invalid password' });
  }

  const load = {
    doctor: () => {
      return Doctor.findOne({ user: user._id }).populate('user');
    },
    patient: async () => {
      if (!tokenApp) {
        return res
          .status(400)
          .json({ message: 'notification token not provided' });
      }

      const patient = await Patient.findOne({ user: user._id }).populate(
        'user'
      );

      const { tokensApp } = patient;
      if (!tokensApp.includes(tokenApp)) {
        const newsTokensApp = tokensApp;
        newsTokensApp.push(tokenApp);
        await Patient.updateOne(
          { _id: patient._id },
          { tokensApp: newsTokensApp }
        );
      }

      return patient;
    },
    clerk: user,
  };

  const data = await load[user.type]();

  const token = jwt.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 86400,
  });

  return res.json({ token, data });
};
