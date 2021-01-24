const express = require("express");
const router = express.Router();

router.use("/", require("./logins")).use("/mem", require("./api"));

module.exports = router;
