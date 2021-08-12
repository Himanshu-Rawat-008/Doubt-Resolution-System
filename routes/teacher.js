const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const checkUser = require("../middleware/checkUser");
const passport = require("passport");

router.post("/sign-up", passport.blockAccess, teacherController.signUp);

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
  checkUser.teacherUser,
  teacherController.showAssistants
);

router.get(
  "/assistant-detail/:id",
  checkUser.teacherUser,
  teacherController.assistantDetail
);

module.exports = router;
