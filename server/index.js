const http = require("http");
const path = require("path");
const fs = require("fs");
const EventEmitter = require("events");
const logEvents = require("./log-events");
const fsPromises = fs.promises;

class Emitter extends EventEmitter {}

const emitter = new Emitter();
emitter.on("log", (message, fileName) => logEvents({ message, fileName }));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const readType = contentType.includes("image") ? "" : "utf-8";
    const status = filePath.includes("404") ? 404 : 200;
    const raw = await fsPromises.readFile(filePath, readType);
    const data = contentType === "application/json" ? JSON.parse(raw) : raw;
    response.writeHead(status, { "Content-Type": contentType });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.log({ error });
    emitter.emit("log", `${error.name}\t${error.message}\t`, "errorLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(`${req.url}\t${req.method}`);
  emitter.emit("log", `${req.url}\t${req.method}\t`, "reqLog.txt");
  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/js";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;

    default:
      contentType = "text/html";
  }

  let filePath;

  if (contentType === "text/html" && req.url === "/") {
    filePath = path.join(__dirname, "views", "index.html");
  } else if (contentType === "text/html" && req.url.slice(-1) === "/") {
    filePath = path.join(__dirname, "views", req.url, "index.html");
  } else if (contentType === "text/html") {
    filePath = path.join(__dirname, "views", req.url);
  } else {
    filePath = path.join(__dirname, req.url);
  }

  if (!extension && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    // serve the file
    serveFile(filePath, contentType, res);
  } else {
    // 404 or redirect
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }

  console.log({ filePath, contentType });

  // let urlPath;

  // if (req.url === "/" || req.url === "index.html") {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   urlPath = path.join(__dirname, "views", "index.html");

  //   fs.readFile(urlPath, "utf-8", (err, data) => {
  //     if (err) throw err;

  //     res.end(data);
  //   });
  // }
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
