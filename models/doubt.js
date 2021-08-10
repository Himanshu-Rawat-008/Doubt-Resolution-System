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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    status: {
      type: String,
      enum: ["ESCALATED", "NEW", "BUSY", "SOLVED"],
    },
  },
  {
    timestamps: true,
  }
);

const Doubt = mongoose.model("Doubts", doubtSchema);
module.exports = Doubt;
