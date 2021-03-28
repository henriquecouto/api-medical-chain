const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail.json');

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // ssl
  auth: mailConfig.auth,
});

const sendMail = ({ receiverEmail, message }) => {
  const mailOptions = {
    from: '"Henrique Couto" <contato@henriquecouto.com.br>',
    to: receiverEmail,
    subject: message.subject,
    html: message.content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    }
    return info.response;
  });
};

module.exports = sendMail;
