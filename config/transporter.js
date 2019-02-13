const nodeMail = require('nodemailer');

const transporter = nodeMail.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SPLITIFY_GMAIL,
    pass: process.env.SPLITIFY_GMAIL_PASSWORD,
  },
});

module.exports = transporter;
