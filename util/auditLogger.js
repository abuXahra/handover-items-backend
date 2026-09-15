// utils/auditLogger.js
const AuditLog = require("../models/auditlog.model");

const createAuditLog = async ({
  req,
  user,
  action,
  entity,
  entityId,
  details = {},
}) => {
  await AuditLog.create({
    user,
    action,
    entity,
    entityId,
    ipAddress: req.ip,
    userAgent: req.get("user-agent"),
    details,
  });
};

module.exports = createAuditLog;

// call it in controller:
// await createAuditLog({
//   req,
//   user: req.user._id,
//   action: "CHECKED_IN",
//   entity: "Visitor",
//   entityId: visitor._id,
//   details: {
//     gate: visitor.entryGate,
//     remarks: visitor.remarks,
//   },
// });
