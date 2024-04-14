const { logEvents } = require("./log-events");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  logEvents({
    message: `${err.name}\t${err.message}`,
    fileName: "errorLogs.txt",
  });
  res.status(400).send(err.message);
};

module.exports = errorHandler;
