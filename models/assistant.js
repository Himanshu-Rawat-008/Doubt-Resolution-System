const mongoose = require("mongoose");

const assistantSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["TA"],
      default: "TA",
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
    escalated: {
      type: Number,
      default: 0,
    },
    solved: {
      type: Number,
      default: 0,
    },
    doubt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doubts",
    },
  },
  {
    timestamps: true,
  }
);

const Assistant = mongoose.model("Assistants", assistantSchema);
module.exports = Assistant;
