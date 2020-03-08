module.exports = res => (error, data) => {
  if (error) {
    res.status(500).json({ message: error });
  }

  res.json({
    message: 'data loaded with success',
    data,
  });
};
