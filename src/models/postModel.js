const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentor: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const postSchema = new mongoose.Schema(
  {
    postCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["AI", "Backend", "Frontend", "FullStack"],
      default: "Backend",
    },
    postImage: { type: String },
    date: {
      type: Date,
      default: Date.now,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  { versionKey: false }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
