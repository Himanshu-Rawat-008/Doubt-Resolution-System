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

router.get("/sign-out", assistantController.signOut);

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
  "/solution-of-doubt",
  passport.checkAuthentication,
  assistantController.solvedDoubt
);

router.put(
  "/doubt-taken",
  passport.checkAuthentication,
  assistantController.takenDoubt
);

module.exports = router;
