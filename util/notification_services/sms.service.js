const twilio = require("twilio");
const User = require("../models/user.model");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (notification) => {
  const recipient = await User.findById(notification.recipient);

  if (!recipient) {
    throw new Error("Recipient not found");
  }

  await client.messages.create({
    body: notification.message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: recipient.phoneNumber,
  });
};

module.exports = sendSMS;
