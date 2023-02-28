"use strict";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.FROM_EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});
async function sendEmail(key, to) {
  await transporter.sendMail({
    from: process.env.FROM_EMAIL, // sender address
    to: to, // list of receivers
    subject: "OTP Code", // Subject line
    text: "Hello world?", // plain text body
    html: `
    <div>
        <b>Please use the below OTP code for forgot password<b>
        <p>Code: ${key}</>
    </div>
    `, // html body
  });
}
module.exports = {
  sendEmail,
};
