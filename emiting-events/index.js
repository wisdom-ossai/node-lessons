const logEvents = require("./log-events");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Listen to log event
myEmitter.on("log", (message) => logEvents({ message }));

setTimeout(() => {
  // Emit log event with a message
  myEmitter.emit("log", "Log event emitted!");
}, 2000);
