const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
    like_count: {
      type: Number,
      default: 0,
    },
    unlike_count: {
      type: Number,
      default: 0,
    },
    saved_count: {
      type: Number,
      default: 0,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Post is required"],
      ref: "Posts",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Creator is required."],
      ref: "Users",
    },
  },
  { collection: "Comments", timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
