const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const checkUser = require("../middleware/checkUser");
const passport = require("passport");

router.post("/signUp", studentController.signUp);

router.get(
  "/signIn",
  passport.authenticate("local", { failWithError: true }),
  studentController.signIn
);

router.get("/signOut", passport.checkAuthentication, studentController.signOut);

router.get(
  "/create-doubt",
  checkUser.studentUser,
  studentController.createDoubt
);

router.post(
  "/add-comment",
  checkUser.studentUser,
  studentController.addComment
);

router.get(
  "/show-doubts",
  checkUse.studentUser,
  studentController.showSolvedDoubts
);
module.exports = router;
