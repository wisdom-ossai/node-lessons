const fs = require("fs");
const path = require("path");

const fsPromises = fs.promises;

const runFSActions = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf-8"
    );
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "starterPromise.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "starterPromise.txt"),
      "\n\nThis is an appended content to the file created by reading the starter file"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "starterPromise.txt"),
      path.join(__dirname, "files", "starterPromiseRenamed.txt")
    );
    await fsPromises.unlink(
      path.join(__dirname, "files", "renamedNewStarter.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf-8"
    );
    console.log(newData);
  } catch (error) {
    console.log(error);
  }
};

runFSActions();

// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf-8",
//   (err, data) => {
//     if (err) throw err;

//     console.log(data);
//   }
// );

// fs.writeFile(
//   path.join(__dirname, "files", "newStater.txt"),
//   "Creating and writing new content on new file.",
//   (err) => {
//     if (err) throw err;

//     fs.appendFile(
//       path.join(__dirname, "files", "newStater.txt"),
//       "\nThis is another line.",
//       (err) => {
//         if (err) throw err;

//         console.log("Append complete");

//         fs.rename(
//           path.join(__dirname, "files", "newStater.txt"),
//           path.join(__dirname, "files", "renamedNewStarterss.txt"),
//           (err) => {
//             if (err) throw err;

//             console.log("Rename complete");
//           }
//         );
//       }
//     );

//     console.log("Write completed");
//   }
// );

process.on("uncaughtException", () => {
  console.log("Error has occured");
});
