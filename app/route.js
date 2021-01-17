const express = require("express");

const router = express.Router();

const convertController = require("./controller");

router.get("/api/rates", convertController.convert);

module.exports = router;
