function controllerError(errorMessage, errorCode) {
  const error = new Error(errorMessage);
  error.statusCode = errorCode;
  throw error;
}

module.exports = controllerError;
