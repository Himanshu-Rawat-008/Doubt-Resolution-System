const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const passport = require("passport");

router.post("/sign-up", teacherController.signUp);

router.get(
  "/sign-in",
  passport.authenticate("local", { failWithError: true }),
  teacherController.signIn
);

router.get(
  "/sign-out",
  passport.checkAuthentication,
  teacherController.signOut
);
+router.get(
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
