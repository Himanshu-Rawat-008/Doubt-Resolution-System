const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);

router.use("/users", require("./users"));

router.use("/posts", require("./posts"));

router.use("/comments", require("./comments"));

router.use("/api", require("./api"));
// for any futher routes, access from here
// router.use('/routerName', require('./routerFile'));

router.use("/likes", require("./likes"));

router.use("/friends", require("./friends"));
module.exports = router;