const express = require("express");
const path = require("path");
const employees = require("../../../data/employees.json");

const data = {
  employees,
};

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    const { firstName, lastName } = req.body;
    res.status(201).json({
      firstName,
      lastName,
    });
  });
router
  .route("/:id")
  .get((req, res) => {
    const employee = data.employees.find((v) => +v.id === +req.params.id);
    if (!employee)
      return res
        .status(404)
        .json({ message: "Employee with the requested id is not found" });
    res.json(employee);
  })
  .patch((req, res) => {
    const employee = data.employees.find((v) => +v.id === +req.params.id);
    if (!employee)
      return res
        .status(404)
        .json({ message: "Employee with the requested id is not found" });
    res.json({
      ...employee,
      ...req.body,
    });
  })
  .delete((req, res) => {
    const employee = data.employees.find((v) => +v.id === +req.params.id);
    if (!employee)
      return res
        .status(404)
        .json({ message: "Employee with the requested id is not found" });

    res.json({
      ...employee,
    });
  });

module.exports = router;
