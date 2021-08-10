const Assistant = require("../models/Assistant");
const Doubt = require("../models/doubt");

const env = require("dotenv");
env.config();

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports.create = async function (res, res) {
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

  return res.status(200).json({ student: req.student });
};
