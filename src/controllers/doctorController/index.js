const { Doctor } = require('../../models/DoctorModel');
const dataLoaded = require('../../helpers/dataLoaded');

exports.getDoctors = async (req, res) => {
  Doctor.find(dataLoaded(res)).populate('user');
};

exports.getDoctor = async (req, res) => {
  const { id } = req.params;
  Doctor.findById(id, dataLoaded(res)).populate('user');
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  Doctor.findByIdAndUpdate(
    id,
    update,
    { new: true, runValidators: true },
    dataLoaded(res)
  ).populate('user');
};
