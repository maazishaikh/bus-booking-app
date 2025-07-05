const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendConfirmationEmail = (to, subject, html) => {
  return transporter.sendMail({
    from: '"Bus Booking" <' + process.env.EMAIL_USER + '>',
    to,
    subject,
    html
  });
};
