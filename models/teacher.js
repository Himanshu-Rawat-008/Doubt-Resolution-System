const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["T"],
      default: "T",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teachers", teacherSchema);
module.exports = Teacher;
