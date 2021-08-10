const mongoose = require("mongoose");

const assistantSchema = new mongoose.Schema(
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
    escalated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doubts",
      },
    ],
    resolved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doubts",
      },
    ],
    status: {
      type: String,
      enum: ["BUSY", "AVAILABLE"],
      default: "BUSY",
    },
  },
  {
    timestamps: true,
  }
);

const Assistant = mongoose.model("Assistants", assistantSchema);
module.exports = Assistant;
