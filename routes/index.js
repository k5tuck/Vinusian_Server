const express = require("express");
const router = express.Router();

router.use("/", require("./logins")).use("/mem", require("./main"));

module.exports = router;
