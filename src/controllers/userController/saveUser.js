module.exports = (
  user,
  res,
  next = () => {
    return res.json({ message: 'user created with success', data: user });
  }
) => {
  user.save(userError => {
    if (userError) {
      return res.status(500).json({ message: userError });
    }
    next();
  });
};
