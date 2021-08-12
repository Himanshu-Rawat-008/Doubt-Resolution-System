const Teacher = require("../models/teacher");
const Assistant = require("../models/assistant");
const Doubt = require("../models/doubt");

const env = require("dotenv");
env.config();

module.exports.signUp = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      // if password is not same
      return res.status(400).json({ error: "Password dont match" });
    }
    const teacher = Teacher.findOne({ email: req.body.email });

    if (teacher) return res.status(400).json({ error: "Account Exists" });

    req.body.type = "T";
    teacher = await Teacher.create(req.body);

    teacher.password = undefined;

    return res.status(200).json({ teacher });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.signIn = async function (req, res) {
  try {
    if (!req.user) return res.status(404).json({ error: "Not Found" });

    if (req.isAuthenticated()) {
      let type = req.user.type;
      req.user.password = undefined;
      if (type == "T") {
        return res.status(200).json({ Success: "Success", Teacher: req.user });
      }
    }

    return res.status(400).json({ Error: "Error " });
  } catch (err) {
    return res.status(400).json({ error: "error" });
  }
};

module.exports.showAssistants = async function (req, res) {
  try {
    let assistant = await Assistant.find({}).sort("-createdAt");

    let doubt = await Doubt.find({})
      .sort("-createdAt")
      .populate("by")
      .populate({ path: "comments", populate: { path: "doubt by" } })
      .exec();

    return res.status(200).json({ assistant, doubt });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.assistantDetail = async function (req, res) {
  try {
    const id = req.params.id;

    let assistant = await Assistant.find({ id }).sort("-createdAt");

    return res.status(200).json({ assistant });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.signOut = async function (req, res) {
  req.logout();
  return res.status(200).json({ teacher: undefined });
};
