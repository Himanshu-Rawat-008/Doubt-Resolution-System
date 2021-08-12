const express = require("express");
const router = express.Router();
const assistantController = require("../controllers/assistantController");
const passport = require("passport");
router.post("/signUp", assistantController.signUp);

router.get(
  "/signIn",
  passport.authenticate("local", { failWithError: true }),
  assistantController.signIn
);

router.get("/signOut", assistantController.signOut);

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
  "/solved-doubt",
  passport.checkAuthentication,
  assistantController.solvedDoubt
);

router.put(
  "/doubt-taken",
  passport.checkAuthentication,
  assistantController.takenDoubt
);

module.exports = router;
