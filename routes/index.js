const express = require("express");

const router = express.Router();
router.get("/", (req, res) => res.send("Server running"));

router.use("/teacher", require("./teacher"));

router.use("/student", require("./student"));

router.use("/ta", require("./assistant"));

module.exports = router;
