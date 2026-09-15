const sendEmail = require("../util/notification_services/email.service");
const sendSMS = require("../util/notification_services/sms.service");
const sendPush = require("../util/notification_services/push.service");

const sendNotification = async (notification) => {
  try {
    switch (notification.channel) {
      case "EMAIL":
        await sendEmail(notification);
        break;

      case "SMS":
        await sendSMS(notification);
        break;

      case "PUSH":
        await sendPush(notification);
        break;

      default:
        throw new Error("Unsupported notification channel");
    }

    notification.status = "SENT";
    await notification.save();
  } catch (error) {
    notification.status = "FAILED";
    await notification.save();

    console.error(error);
  }
};

module.exports = sendNotification;
