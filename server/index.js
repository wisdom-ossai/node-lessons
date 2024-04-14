const express = require("express");
const path = require("path");
const fs = require("fs");
const EventEmitter = require("events");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const { logEvents, reqEventsLogger } = require("./middlewares/log-events");

const subdirRouter = require("./routes/subdir");
const rootRouter = require("./routes/root");

const fsPromises = fs.promises;

const corsWhitelist = [
  "https://yousite.com",
  "http://127.0.0.1:550",
  "http://localhost:3500",
  "https://www.google.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Unknown origin!"));
    }
  },
  optionsSuccessStatus: 200,
};
class Emitter extends EventEmitter {}
const emitter = new Emitter();
emitter.on("log", (message, fileName) => logEvents({ message, fileName }));

const app = express();

app.use(reqEventsLogger);
app.use(cors(corsOptions));

// handling url encoded data e.g form-data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// built-in middleware for serving static files.
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

const PORT = process.env.PORT || 3500;

app.use("/", rootRouter);
app.use("/subdir", subdirRouter);

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
