const Student = require("../models/student");
const Comment = require("../models/comments");
const Doubt = require("../models/doubt");
const mongoose = require("mongoose");
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
    let student = await Student.findOne({ email: req.body.email });
    if (student) return res.status(400).json({ error: "Account Exists" });

    req.body.type = "S";
    const { name, password, email, type } = req.body;
    student = await Student.create({ name, email, password, type });

    student.password = undefined;
    return res.status(200).json({ Student: student });
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
      if (type == "S") {
        return res.status(200).json({ Success: "Success", Student: req.user });
      }
    }
    return res.status(400).json({ Error: "Error " });
  } catch (err) {
    return res.status(400).json({ error: "error" });
  }
};

module.exports.createDoubt = async function (req, res) {
  try {
    let { title, description } = req.body;
    let doubt = await Doubt.create({
      title,
      description,
      status: "NEW",
      by: req.session.passport.user,
    });
    doubt = await doubt.populate("by").execPopulate();

    return res.status(200).json({ Doubt: doubt });
  } catch (err) {
    console.log("Error " + err);
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.addComment = async function (req, res) {
  try {
    const { text, doubtId } = req.body;

    const studentId = req.session.passport.user;

    let comment = await Comment.create({ text, doubt: doubtId, by: studentId });

    let doubt = await Doubt.findById({ _id: doubtId });

    doubt.comments.push(comment);
    comment.save();

    return res.status(200).json({ Doubt: doubt });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.showSolvedDoubts = async function (req, res) {
  try {
    let doubt = await Doubt.aggregate()
      .match({ status: "SOLVED" })
      .sort("-createdAt")
      .populate("by")
      .populate({ path: "comments", populate: { path: "doubt by" } })
      .execPopulate();
    return res.status(200).json({ Doubt:doubt });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

module.exports.signOut = async function (req, res) {
  try {
    req.logout();
    return res.status(200).json({ Student: undefined });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};
