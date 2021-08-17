const express = require("express");

const router = express.Router();

const homeController = require("../controllers/homeController");
router.get("/", homeController.show);

router.use("/teacher", require("./teacher"));

router.use("/student", require("./student"));

router.use("/ta", require("./assistant"));

module.exports = router;
