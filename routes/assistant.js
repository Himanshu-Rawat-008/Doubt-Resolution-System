const express = require("express");
const router = express.Router();
const assistantController = require("../controllers/assistantController");
const passport = require("passport");
const middleware = require("../middleware");

router.post("/sign-up", assistantController.signUp);

router.get(
  "/sign-in",
  middleware.checkUser,
  passport.authenticate("local", { failWithError: true }),
  assistantController.signIn
);

router.get(
  "/sign-out",
  passport.checkAuthentication,
  assistantController.signOut
);

router.get(
  "/doubts",
  passport.checkAuthentication,
  assistantController.showDoubts
);

router.put(
  "/escalate-doubt/:id",
  passport.checkAuthentication,
  assistantController.escalateDoubt
);

router.put(
  "/solution-of-doubt/:id",
  passport.checkAuthentication,
  assistantController.solvedDoubt
);

router.put(
  "/doubt-taken/:id",
  passport.checkAuthentication,
  assistantController.takenDoubt
);

module.exports = router;
