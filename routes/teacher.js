const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const passport = require("passport");
const middleware = require("../middleware");

router.post("/sign-up", middleware.checkUser, teacherController.signUp);

router.get(
  "/sign-in",
  middleware.checkUser,
  passport.authenticate("local"),
  teacherController.signIn
);

router.get(
  "/sign-out",
  passport.checkAuthentication,
  teacherController.signOut
);

router.get(
  "/show-assistants",
  passport.checkAuthentication,
  teacherController.showAssistants
);

router.get(
  "/assistant-detail/:id",
  passport.checkAuthentication,
  teacherController.assistantDetail
);

module.exports = router;
