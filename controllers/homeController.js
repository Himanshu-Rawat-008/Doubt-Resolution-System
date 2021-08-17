const Student = require("../models/student");
const Doubt = require("../models/doubt");
const Teacher = require("../models/teacher");

module.exports.show = async function (req, res) {
  try {
    const teachers = await Teacher.find({}).select(
      "-password -createdAt -updatedAt"
    );
    const students = await Student.find({}).select(
      "-password -createdAt -updatedAt"
    );
    const solvedDoubts = await Doubt.find({
      status: { $in: ["SOLVED"] },
    })
      .sort("-createdAt")
      .select(" -createdAt -updatedAt")
      .populate("by")
      .populate({ path: "comments", populate: { path: "doubt by" } })
      .exec();

    const unsolvedDoubts = await Doubt.find({
      status: { $in: ["NEW", "ESCALATED"] },
    })
      .sort("-createdAt")
      .select(" -createdAt -updatedAt")
      .populate("by", "-password")
      .populate({ path: "comments", populate: { path: "doubt by" } })
      .exec();
    return res.status(200).json({
      Teachers: teachers,
      Students: students,
      SolvedDoubts: solvedDoubts,
      UnsolvedDoubts: unsolvedDoubts,
    });
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};
