const Student = require("../models/student");
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
    let student = Student.findOne({ email: req.body.email });

    if (student) return res.status(400).json({ error: "Account Exists" });

    // save password in encrypted form
    req.body.password = encryptPassword(req.body.password);
    delete req.body.confirm_password;

    req.body.type = "S";

    const student = await Student.create(req.body);

    student.password = undefined;

    return res.status(200).json({ student });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.signIn = async function (req, res) {
  if (!req.user) return res.status(404).json({ error: "Data Dont Exists" });

  return res.status(200).json({ student: req.student });
};

module.exports.createDoubt = async function (req, res) {
  try {
    const id = req.param.id;
    const { title, description } = req.body;
    let doubt = await Doubt.create({
      title,
      description,
      status: "NEW",
      by: id,
    });

    return res.status(200).json({ doubt });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.addComment = async function (req, res) {
  try {
    const { text, doubtId, studentId } = req.body;
    let comment = await Comment.create({ text, doubt: doubtId, by: studentId });

    let doubt = await Doubt.findById({ doubtId });

    doubt.comments.push(comment);

    return res.status(200).json({ comment, doubt });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.showDoubts = async function (req, res) {
  try {
    let doubt = await Doubt.find({})
      .populate("by")
      .populate({ path: "comments", select: "by" })
      .exec();

    return res.status(200).json({ doubt });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};
