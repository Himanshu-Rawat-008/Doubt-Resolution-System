const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const checkUser = require("../middleware/checkUser");
const passport = require("passport");

router.post("/sign-up", studentController.signUp);

router.get(
  "/sign-in",
  passport.authenticate("local"),
  studentController.signIn
);

router.get(
  "/sign-out",
  passport.checkAuthentication,
  studentController.signOut
);

router.post(
  "/create-doubt/:id",
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
  checkUser.studentUser,
  studentController.showSolvedDoubts
);
module.exports = router;
