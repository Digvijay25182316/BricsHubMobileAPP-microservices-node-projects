const nodemailer = require("nodemailer");

async function sendEmail(file, email, message, subject) {
  // Create a nodemailer transporter using Outlook SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: subject,
    text: message,
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ],
  };

  // Wrap the sendMail function in a Promise to make it awaitable
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(info.response);
      }
    });
  });
}
module.exports = sendEmail;
