const nodemailer = require("nodemailer");
const settings = require("../appsettings.json");

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: settings.Outlook.user,
    pass: settings.Outlook.password,
  }
});

const sendMail = (receiver, header, body) => {
  const mailOptions = {
    from: settings.Outlook.user,
    to: receiver,
    subject: header,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Failed to send mail:\n${error}`);
    }
  });
}

module.exports = sendMail;