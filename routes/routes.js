const express = require("express");

const router = express.Router();

const getData = require("../controllers/rate_limit_controller");

router.get("/check", getData.checkData);

module.exports = router;