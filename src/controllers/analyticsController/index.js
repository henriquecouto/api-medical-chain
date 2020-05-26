const { Appointment } = require('../../models/AppointmentModel');
const { Medication } = require('../../models/MedicationModel');

const months = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
};

exports.blocked = async (req, res) => {
  const blocked = await Appointment.countDocuments({ blocked: true });
  const waiting = await Appointment.countDocuments({ blocked: false });
  return res.send([{ blocked, waiting }]);
};

exports.assurance = async (req, res) => {
  const right = await Appointment.countDocuments({ blockedCorrect: true });
  const wrong = await Appointment.countDocuments({ blockedCorrect: false });
  return res.send([{ right, wrong }]);
};

exports.period = async (req, res) => {
  Appointment.aggregate(
    [
      {
        $facet: {
          registrationDate: [
            {
              $match: {
                registrationDate: {
                  $gte: new Date(
                    new Date().setMonth(new Date().getMonth() - 5)
                  ),
                },
              },
            },
            {
              $group: {
                _id: {
                  $month: '$registrationDate',
                },
                countRegistration: { $sum: 1 },
              },
            },
          ],
          blockedDate: [
            {
              $match: {
                blockedDate: {
                  $gte: new Date(
                    new Date().setMonth(new Date().getMonth() - 5)
                  ),
                },
              },
            },
            {
              $group: {
                _id: {
                  $month: '$blockedDate',
                },
                countBlocked: { $sum: 1 },
              },
            },
          ],
        },
      },
      { $unwind: '$registrationDate' },
      { $unwind: '$blockedDate' },
      {
        $redact: {
          $cond: [
            {
              $eq: ['$registrationDate._id', '$blockedDate._id'],
            },
            '$$KEEP',
            '$$PRUNE',
          ],
        },
      },
      {
        $project: {
          data: {
            month: '$registrationDate._id',
            registered: '$registrationDate.countRegistration',
            blocked: '$blockedDate.countBlocked',
          },
        },
      },
      { $unwind: '$data' },
      { $replaceRoot: { newRoot: '$data' } },
      { $sort: { month: 1 } },
    ],
    (error, data) => {
      data = data.map(v => {
        v.month = months[v.month];
        return v;
      });
      console.log(data);
      if (error) return res.status(500).send(error);
      return res.send(data);
    }
  );
};

exports.sended = async (req, res) => {
  const right = await Appointment.countDocuments({ sendedApp: true });
  const wrong = await Appointment.countDocuments({ sendedApp: false });
  return res.send([{ right, wrong }]);
};

exports.notification = async (req, res) => {
  const query = await Appointment.aggregate([
    { $unwind: '$treatment' },
    {
      $group: {
        _id: { notifyCorrect: '$treatment.notifyCorrect' },
        count: { $sum: 1 },
      },
    },
  ]);

  let right;
  let wrong;

  query.forEach(({ _id, count }) => {
    if (_id.notifyCorrect === false) {
      wrong = count;
    } else if (_id.notifyCorrect === true) {
      right = count;
    }
  });

  // for (i in query) {
  //   const result = query[i]._id;
  //   if (result.notifyCorrect === false) {
  //     wrong = result.count;
  //   } else if (result.notifyCorrect === true) {
  //     right = result.count;
  //   }
  // }

  return res.send([{ right, wrong }]);
};
