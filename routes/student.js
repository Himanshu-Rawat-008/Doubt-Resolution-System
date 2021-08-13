const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const passport = require("passport");
const middleware = require("../middleware");

router.post("/sign-up", middleware.checkUser, studentController.signUp);

router.get(
  "/sign-in",
  middleware.checkUser,
  passport.authenticate("local"),
  studentController.signIn
);

router.get("/sign-out", studentController.signOut);

router.post(
  "/create-doubt/:id",
  passport.checkAuthentication,
  studentController.createDoubt
);

router.post(
  "/add-comment",
  passport.checkAuthentication,
  studentController.addComment
);

router.get(
  "/show-doubts",
  passport.checkAuthentication,
  studentController.showSolvedDoubts
);
module.exports = router;
