const gcm = require('node-gcm');
const notifyConfig = require('../config/notify');

const sender = new gcm.Sender(notifyConfig.sender);

const sendNotification = (tokens, title, body, aptmId) => {
  const message = new gcm.Message();

  message.addNotification('title', title);
  message.addNotification('icon', 'ic_launcher');
  message.addNotification('body', body);
  message.addNotification('sound', 'default');
  message.addData({ aptmId });

  sender.send(message, tokens, (err, response) => {
    if (err) {
      console.error('error: ', err);
    } else {
      console.log('success: ', response);
    }
  });
};

module.exports = { sendNotification };
