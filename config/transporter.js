const nodeMail = require('nodemailer');

const transporter = nodeMail.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: 'splitifyWebApp@gmail.com',
    pass: 'splitify2019',
  },
});

module.exports = transporter;
