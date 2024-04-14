const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const logEvents = async ({ message, fileName }) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    const dirExist = fs.existsSync(path.join(__dirname, "logs"));

    if (!dirExist) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", fileName),
      logItem
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = logEvents;
