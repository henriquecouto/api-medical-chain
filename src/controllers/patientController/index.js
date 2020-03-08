const { Patient } = require('../../models/PatientModel');
const dataLoaded = require('../../helpers/dataLoaded');

exports.getPatients = async (req, res) => {
  Patient.find(dataLoaded(res)).populate('user');
};

exports.getPatient = async (req, res) => {
  const { id } = req.params;
  Patient.findById(id, dataLoaded(res)).populate('user');
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  Patient.findByIdAndUpdate(
    id,
    update,
    { new: true, runValidators: true },
    dataLoaded(res)
  ).populate('user');
};
