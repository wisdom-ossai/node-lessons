const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), {
  encoding: "utf-8",
});

const ws = fs.createWriteStream(path.join(__dirname, "files", "lorem-new.txt"));

// rs.on("data", (chunkData) => {
//   ws.write(chunkData);
//   console.log("read complete");
// });

/**
 * More efficient than the rs.on listener above
 */
rs.pipe(ws);
