const DynamicKey = {
  USER_HANDOVER: "USER_HANDOVER",
};

function getDynamicKey(key, userId) {
  return `${key}:${userId}`;
}

function getUserHandoversKey(userId) {
  return getDynamicKey(DynamicKey.USER_HANDOVER, userId);
}

module.exports = { getUserHandoversKey, DynamicKey };
