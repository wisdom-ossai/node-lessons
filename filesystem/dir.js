const fs = require("fs");
const path = require("path");

/**
 * Throws an error if the directory already exists
 * Both checks below does not run at the same time because of the asynchronous nature of nodejs
 * If the directory exists at the time you run this file, the remove block will be called, else the create block.
 */
const folder = path.join(__dirname, "new-files");
if (!fs.existsSync(folder)) {
  fs.mkdir(folder, (e) => {
    if (e) throw e;

    console.log("directory created");
  });
}

if (fs.existsSync(folder)) {
  fs.rmdir(folder, (e) => {
    if (e) throw e;

    console.log("directory removed");
  });
}
