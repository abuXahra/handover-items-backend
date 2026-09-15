const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const controllerError = require("../util/error.utils");

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    controllerError("Authentication required", 401);

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  req.user = decoded;

  next();
});

module.exports = authenticate;
