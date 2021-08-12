const express = require("express");
const router = express.Router();
const assistantController = require("../controllers/assistantController");
const checkUser = require("../middleware/checkUser");
router.post("/signUp", assistantController.signUp);

router.get(
  "/signIn",
  passport.authenticate("local", { failWithError: true }),
  assistantController.signIn
);

router.get("/signOut", assistantController.signOut);

router.get("/doubts", checkUser.assistantUser, assistantController.showDoubts);

router.update(
  "/escalate-doubt/:id",
  checkUser.assistantUser,
  assistantController.escalateDoubt
);

router.update(
  "/solved-doubt",
  checkUser.assistantUser,
  assistantController.solvedDoubt
);

router.update(
  "/doubt-taken",
  checkUser.assistantUser,
  assistantController.takenDoubt
);

module.exports = router;
