const express = require("express");
const router = express.Router();
const assistantController = require("../controllers/assistantController");
const checkUser = require("../middleware/checkUser");
const passport = require("passport");
router.post("/signUp", assistantController.signUp);

router.get(
  "/signIn",
  passport.authenticate("local", { failWithError: true }),
  assistantController.signIn
);

router.get("/signOut", assistantController.signOut);

router.get("/doubts", checkUser.assistantUser, assistantController.showDoubts);

router.put(
  "/escalate-doubt/:id",
  checkUser.assistantUser,
  assistantController.escalateDoubt
);

router.put(
  "/solved-doubt",
  checkUser.assistantUser,
  assistantController.solvedDoubt
);

router.put(
  "/doubt-taken",
  checkUser.assistantUser,
  assistantController.takenDoubt
);

module.exports = router;
