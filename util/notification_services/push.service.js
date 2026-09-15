const admin = require("firebase-admin");
const User = require("../models/user.model");

// Initialize once during app startup
// admin.initializeApp({
//   credential: admin.credential.cert(require("../firebase-service-account.json")),
// });

const sendPush = async (notification) => {
  const recipient = await User.findById(notification.recipient);

  if (!recipient || !recipient.fcmToken) {
    throw new Error("Recipient has no push token");
  }

  await admin.messaging().send({
    token: recipient.fcmToken,
    notification: {
      title: notification.title,
      body: notification.message,
    },
  });
};

module.exports = sendPush;
