const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    status: {
      type: String,
      enum: ["ESCALATED", "NEW", "BUSY", "SOLVED"],
      default: "NEW",
      required: true,
    },
    solution: {
      type: String,
    },
    solvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assistant",
    },
  },
  {
    timestamps: true,
  }
);

const Doubt = mongoose.model("Doubts", doubtSchema);
module.exports = Doubt;
