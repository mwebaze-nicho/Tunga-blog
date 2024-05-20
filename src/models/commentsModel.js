const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  reply: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const commentSchema = new mongoose.Schema(
  {
    commentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    replies: [replySchema],
  },
  { versionKey: false }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
