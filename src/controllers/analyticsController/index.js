const { Appointment } = require('../../models/AppointmentModel');
const dataLoaded = require('../../helpers/dataLoaded');

exports.blocked = async (req, res) => {
  const blocked = await Appointment.count({ blocked: true });
  const waiting = await Appointment.count({ blocked: false });
  return res.send({ blocked, waiting });
};

exports.assurance = async (req, res) => {
  const right = await Appointment.count({ blockedCorrect: true });
  const wrong = await Appointment.count({ blockedCorrect: false });
  return res.send({ right, wrong });
};

exports.period = async (req, res) => {
  const { value, quantity } = req.body;

  const load = {
    daily: () => {
      Appointment.aggregate(
        [
          {
            $match: {
              registrationDate: {
                $gte: new Date(
                  new Date().setDate(new Date().getDate() - quantity)
                ),
              },
            },
          },
          {
            $group: {
              _id: {
                date: '$registrationDate',
              },
              count: { $sum: 1 },
            },
          },
        ],
        dataLoaded(res)
      );
    },
    monthly: () => {
      Appointment.aggregate(
        [
          {
            $match: {
              registrationDate: {
                $gte: new Date(
                  new Date().setMonth(new Date().getMonth() - quantity)
                ),
              },
            },
          },
          {
            $group: {
              _id: {
                $month: '$registrationDate',
              },
              count: { $sum: 1 },
            },
          },
        ],
        dataLoaded(res)
      );
    },
    yearly: () => {
      Appointment.aggregate(
        [
          {
            $match: {
              registrationDate: {
                $gte: new Date(
                  new Date().setFullYear(new Date().getFullYear - quantity)
                ),
              },
            },
          },
          {
            $group: {
              _id: {
                $year: '$registrationDate',
              },
              count: { $sum: 1 },
            },
          },
        ],
        dataLoaded(res)
      );
    },
    default: () => {
      return res.send({
        message: "expected 'daily', 'monthly' or 'yearly' ",
      });
    },
  };

  return load[value] ? load[value]() : load.default();
};
