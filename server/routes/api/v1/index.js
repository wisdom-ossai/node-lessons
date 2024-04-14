const express = require("express");
const employeesRouter = require("./employeesRouter");

const router = express.Router();

router.use("/employees", employeesRouter);

module.exports = router;
