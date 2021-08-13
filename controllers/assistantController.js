const Assistant = require("../models/assistant");
const Doubt = require("../models/doubt");

const env = require("dotenv");
env.config();

module.exports.signUp = async function (req, res) {
  try {
    if (req.isAuthenticated())
      return res.status(400).json({ error: "What are you trying" });

    if (req.body.password != req.body.confirm_password) {
      // if password is not same
      return res.status(400).json({ error: "Password dont match" });
    }
    let assistant = await Assistant.findOne({ email: req.body.email });

    console.log(assistant);
    if (assistant) return res.status(400).json({ error: "Account Exists" });

    req.body.type = "TA";
    assistant = await Assistant.create(req.body);

    assistant.password = undefined;

    return res.status(200).json({ Assistant: assistant });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.signIn = async function (req, res) {
  try {
    // console.log(req.session.passport);

    if (!req.user) return res.status(404).json({ error: "Not Found" });

    if (req.isAuthenticated()) {
      let type = req.user.type;
      req.user.password = undefined;
      if (type == "TA") {
        return res
          .status(200)
          .json({ Success: "Success", Assistant: req.user });
      }
    }
    return res.status(400).json({ Error: "Error " });
  } catch (err) {
    return res.status(400).json({ error: "error" });
  }
};

module.exports.signOut = async function (req, res) {
  try {
    let assistant = await Assistant.findById({
      _id: req.session.passport.user,
    });

    if (!assistant)
      return res.status(200).json({ Error: "What are you trying" });

    if (assistant.doubt != undefined) {
      let doubt = await Doubt.findByIdAndUpdate(
        { _id: assistant.doubt },
        { $set: { status: "ESCALATED" } },
        { new: true }
      );

      assistant = await Assistant.findByIdAndUpdate(
        { _id: req.session.passport.user },
        { $set: { doubt: undefined, escalated: assistant.escalated + 1 } },
        { new: true }
      );
    }

    req.logout();
    return res
      .status(200)
      .json({ Assistant: undefined, message: "Logged Out Successfully" });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};
module.exports.showDoubts = async function (req, res) {
  try {
    let doubt = await Doubt.find({ status: { $in: ["NEW", "ESCALATED"] } })
      .sort("-createdAt")
      .populate("by")
      .populate({ path: "comments", populate: { path: "doubt by" } })
      .exec();
    return res.status(200).json({ Doubts: doubt });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.escalateDoubt = async function (req, res) {
  try {
    const id = req.params.id;

    let doubt = await Doubt.findById({ _id: id });
    let assistant = await Assistant.findById({
      _id: req.session.passport.user,
    });

    if (!doubt && !assistant && doubt._id != assistant._id)
      return res.status(400).json({ Message: "What are you trying" });

    doubt = await Doubt.findByIdAndUpdate(
      { _id: id },
      { $set: { status: "ESCALATED" } },
      { new: true }
    );

    Assistant.findByIdAndUpdate(
      { _id: req.session.passport.user },
      { $set: { doubt: undefined, escalated: assistant.escalated + 1 } },
      { new: true }
    );

    return res.status(200).json({ Doubt: doubt, Assistant: assistant });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.solvedDoubt = async function (req, res) {
  try {
    const { solution } = req.body;
    const id = req.params.id;

    let doubt = await Doubt.findById({ _id: id });
    let assistant = await Assistant.findById({
      _id: req.session.passport.user,
    });

    if (!doubt && !assistant && assistant._id != doubt._id)
      return res.status(400).json({ Message: "What are you trying" });

    doubt = await Doubt.findByIdAndUpdate(
      { _id: doubt._id },
      { $set: { solution: solution, solvedBy: assistant._id } },
      { new: true }
    );

    assistant = await Assistant.findByIdAndUpdate(
      { _id: assistant._id },
      { $set: { doubt: undefined, solved: assistant.solved + 1 } },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: "Problem Solved", Doubt: doubt, Assistant: assistant });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.takenDoubt = async function (req, res) {
  try {
    const id = req.params.id;

    // check if doubt is busy or not and assistant has not doubtId;
    let assistant = await Assistant.findById({
      _id: req.session.passport.user,
    });

    if (assistant.doubt != undefined || assistant.doubt != null)
      return res.status(400).json({ Message: "What are you Trying" });

    let doubt = await Doubt.findById({ _id: id });

    if (doubt.status === "BUSY" || doubt.status === "SOLVED")
      return res.status(400).json({ Message: "What are you trying" });

    assistant = await Assistant.findByIdAndUpdate(
      { _id: req.session.passport.user },
      { $set: { doubt: id } },
      { new: true }
    );

    doubt = await Doubt.findByIdAndUpdate(
      { _id: id },
      { $set: { status: "BUSY" } },
      { new: true }
    );
    return res.status(200).json({ Assistant: assistant, Doubt: doubt });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Server Error" });
  }
};
