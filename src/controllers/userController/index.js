const random = require('../../helpers/random');
const generateUser = require('./generateUser');

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
