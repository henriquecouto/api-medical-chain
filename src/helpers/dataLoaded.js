module.exports = res => (error, data) => {
  if (error) {
    return res.status(500).json({ message: error });
  }

  return res.json({
    message: 'data loaded with success',
    data,
  });
};
