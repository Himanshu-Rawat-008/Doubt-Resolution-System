const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["S"],
      default: "S",
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

const Student = mongoose.model("Students", studentSchema);
module.exports = Student;
