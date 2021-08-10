const Teacher = require("../models/teacher");
const Assistant = require("../models/assistant");
const Comments = require("../models/comments");
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
    const teacher = Teacher.findOne({ email: req.body.email });

    if (teacher) return res.status(400).json({ error: "Account Exists" });

    // save password in encrypted form
    req.body.password = encryptPassword(req.body.password);
    delete req.body.confirm_password;

    req.body.type = "T";
    teacher = await Teacher.create(req.body);

    teacher.password = undefined;

    return res.status(200).json({ teacher });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.signIn = async function (req, res) {
  if (!req.user) return res.status(404).json({ error: "Data Dont Exists" });

  return res.status(200).json({ teacher: req.teacher });
};
