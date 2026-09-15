const Notification = require("../models/notification.model");

const createNotification = async ({
  recipient,
  visitor,
  title,
  message,
  channel = "EMAIL",
}) => {
  return await Notification.create({
    recipient,
    visitor,
    title,
    message,
    channel,
  });
};

module.exports = createNotification;

// USAGE
// await createNotification({
//   recipient: visitor.host,
//   visitor: visitor._id,
//   title: "Visitor Checked In",
//   message: `${visitor.firstName} ${visitor.lastName} has arrived.`,
//   channel: "EMAIL",
// });

// OR
// await createNotification({
//   recipient: req.user._id,
//   title: "New Department Created",
//   message: "ICT Department was successfully created.",
//   channel: "PUSH",
// });

// 2. Create notification
//   const notification = await createNotification({
//     recipient: visitor.host,
//     visitor: visitor._id,
//     title: "Visitor Checked In",
//     message: `${visitor.firstName} ${visitor.lastName} has arrived.`,
//     channel: "EMAIL",
//   });

//   // 3. Send notification
//   await sendNotification(notification);
