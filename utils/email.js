const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1) Create a transporter-> srvice that actually sends the email
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //secure: process.env.EMAIL_PORT === '465', // true for port 465, false for other ports
  });

  //2)Define the email options
  const mailOptions = {
    from: 'Paras bhatia <user@parahsjs.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html
  };

  //3)Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
