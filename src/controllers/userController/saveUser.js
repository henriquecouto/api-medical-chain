module.exports = (
  user,
  res,
  next = () => {
    res.json({ message: 'user created with success', data: user });
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
