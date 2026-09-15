const nodemailer = require("nodemailer");
const User = require("../models/user.model");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (notification) => {
  const recipient = await User.findById(notification.recipient);

  if (!recipient) {
    throw new Error("Recipient not found");
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: recipient.email,
    subject: notification.title,
    text: notification.message,
  });
};

module.exports = sendEmail;
