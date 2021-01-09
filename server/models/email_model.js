const nodemailer = require('nodemailer');
const {Email_Address, Email_Password}= process.env;

/**
 * sendemails
 * @param {string} userEmail
 * @param {string} subject
 * @param {string} text
 *
 */
function sendQuestionMail(userEmail, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: Email_Address,
      pass: Email_Password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const options = {
    from: Email_Address,
    to: userEmail,
    subject: subject,
    text: text,
    html: '<p><strong>台灣職場生態改變由你做起!!有人詢問貴司相關問題。</strong>\
        <p>http://18.136.112.92/api/1.0/chat.html</p></p>\
        <img src =https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/rules-good-co-worker-relationship1.jpg></img>',
  };

  transporter.sendMail(options, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log('訊息發送: ' + info.response);
    }
  });
}


module.exports = {
  sendQuestionMail,
};
