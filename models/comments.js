const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    doubt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doubts",
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comments", commentSchema);
module.exports = Comment;
