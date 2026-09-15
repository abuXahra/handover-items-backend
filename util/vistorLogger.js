const VisitorLog = require("../models/visitorlog.model");

const createVisitorLog = async ({
  visitor,
  action,
  performedBy,
  notes,
  createdAt,
}) => {
  await VisitorLog.create({
    visitor,
    action,
    performedBy,
    notes,
    createdAt,
  });
};

module.exports = createVisitorLog;
