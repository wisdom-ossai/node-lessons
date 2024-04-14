const express = require("express");
const path = require("path");
const router = express.Router();

router.get("^/$|/dog(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "dog.html"));
});

module.exports = router;
