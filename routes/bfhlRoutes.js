const express = require("express");
const bfhlController = require("../controllers/bfhlController");
const bfhl = require("../controllers/bfhlController");

const router = express.Router();

router.route("/").get(bfhl.getbfhl).post(bfhl.add);

module.exports = router;
