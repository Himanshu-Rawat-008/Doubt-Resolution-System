const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", (req, res) => res.send("Server running"));

router.use("/teacher", require("./teacher"));

router.use("/student", require("./student"));

router.use("/technical-assistant", require("./comments"));

module.exports = router;
