/* eslint-disable */
const fetch = require('node-fetch');

const print = (text, ...others) => {
  console.warn(`[${new Date()}] :\n     -->`);
  console.log(text, ...others, '\n');
};

const makeAppointmentData = (doctor, patient) => {
  const month = Number((Math.random() * 5).toFixed(0));
  return {
    exams: ['hemograma'],
    symptons: ['dor de cabeça'],
    diagnosis: ['gripe'],
    treatment: [{ name: 'Dipirona', interval: 8, recurrencies: 8 }],
    doctor,
    patient,
    registrationDate: Date.now() - 2.628e9 * month,
  };
};

const login = async () => {
  return await (
    await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify({ login: 'dr.henrique', password: '123' }),
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();
};

const loadPatient = async headers => {
  const { data } = await (
    await fetch('http://localhost:3001/patients', {
      method: 'GET',
      headers,
    })
  ).json();
  return data[(Math.random() * (data.length - 1)).toFixed(0)]._id;
};

const sendAppointment = async (headers, data) => {
  return await (
    await fetch('http://localhost:3001/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    })
  ).json();
};

async function main() {
  const { token, data } = await login();

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // print('token: ', token);

  let ok = 0;
  let error = 0;

  for (let i = 0; i < 2; i++) {
    setTimeout(async () => {
      const patient = await loadPatient(headers);

      // print('patient: ', patient);

      const appointment = makeAppointmentData(data._id, patient);
      // print('appointment: ', appointment);

      const result = await sendAppointment(headers, appointment);
      // print('result: ', result);

      if (result.message === 'appointment created with success') {
        ok++;
      } else {
        error++;
      }
      print({ ok, error, actual: i });
    }, 200 * i);
  }
}

main();
