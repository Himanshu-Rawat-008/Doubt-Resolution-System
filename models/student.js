const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
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
    // Different instructor, student have registered for
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doubts",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Students", studentSchema);
module.exports = Student;
