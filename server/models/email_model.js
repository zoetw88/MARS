const nodemailer = require('nodemailer');
const {Email_Address, Email_Password}= process.env;
const hbs=require('nodemailer-express-handlebars');


function sendQuestionMail(userEmail, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {user: Email_Address, pass: Email_Password},
    tls: {rejectUnauthorized: false},
  });

  transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './public/views',
  }));
  const options = {
    from: Email_Address,
    to: userEmail,
    subject: subject,
    text: text,
    template: 'index',
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
