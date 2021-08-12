const Assistant = require("../models/Assistant");
const Doubt = require("../models/doubt");

const env = require("dotenv");
env.config();

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports.signUp = async function (res, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      // if password is not same
      return res.status(400).json({ error: "Password dont match" });
    }
    let assistant = Assistant.findOne({ email: req.body.email });

    if (assistant) return res.status(400).json({ error: "Account Exists" });

    // save password in encrypted form
    req.body.password = encryptPassword(req.body.password);
    delete req.body.confirm_password;
    req.body.type = "TA";
    const assistant = await Assistant.create(req.body);

    assistant.password = undefined;

    return res.status(200).json({ assistant });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.signIn = async function (req, res) {
  if (!req.user) return res.status(404).json({ error: "Data Dont Exists" });

  return res.status(200).json({ assistant: req.assistant });
};

module.exports.signOut = async function (req, res) {
  try {
    const id = req.body.id;

    let assistant = await Assistant.findByIdAndUpdate({ id });

    if (assistant.doubt != undefined) {
      await Doubt.findByIdAndUpdate(
        { id: assistant.doubt.id },
        { $set: { status: "ESCALATED" } }
      );
      await Assistant.findByIdAndUpdate({ id }, { $set: { doubt: undefined } });
    }
    req.logout();
    return res
      .status(200)
      .json({ assistant: undefined, message: "Logged Out Successfully" });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};
module.exports.showDoubts = async function (req, res) {
  try {
    let doubt = await Doubt.find({ status: { $in: ["NEW", "ESCALATED"] } });
    return res.status(200).json({ doubt });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.escalateDoubt = async function (req, res) {
  try {
    const doubtId = req.params.id;
    const id = req.body.id;

    let doubt = await Doubt.findById({ id: doubtId });
    if (!doubt) return res.status(404).json({ error: "Doubt Not Found" });

    doubt = await Doubt.findByIdAndUpdate(
      { id: doubtId },
      { $set: { status: "ESCALATED" } }
    );

    let assistant = await Assistant.findById({ id });
    Assistant.findByIdAndUpdate(
      { id },
      { $set: { doubt: undefined, escalated: assistant.escalated + 1 } }
    );

    return res.status(200).json({ doubt, assistant });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.solvedDoubt = async function (req, res) {
  try {
    const { doubtId, solution, assistantId } = req.body;

    let doubt = await Doubt.findById({ doubtId });
    if (!doubt) return res.status(404).json({ error: "Problem not Found" });

    doubt = await Doubt.findByIdAndUpdate(
      { doubtId },
      { $set: { solution: solution, solvedBy: assistantId } }
    );

    let assistant = await Assistant.findById({ assistantId });

    await Assistant.findByIdAndUpdate(
      { id: assistantId },
      { $set: { doubt: undefined, solved: assistant.solved + 1 } }
    );

    return res.status(200).json({ success: "Problem Solved", doubt });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.takenDoubt = async function (req, res) {
  try {
    const { doubtId, assistantId } = req.body;

    let assistant = await Assistant.findByIdAndUpdate(
      { id: assistantId },
      { $set: { doubt: doubtId } }
    );

    let doubt = await Doubt.findByIdAndUpdate(
      { id: doubtId },
      { $set: { status: "BUSY" } }
    );
    return res.status(200).json({ assistant, doubt });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};
