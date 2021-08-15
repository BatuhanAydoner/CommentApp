const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostShcema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required for post."],
    },
    comments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "Comment id is required."],
          ref: "Comments",
        },
      ],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Creator is required."],
      ref: "Users",
    },
  },
  { collection: "Posts", timestamps: true }
);

const Post = mongoose.model("Post", PostShcema);

module.exports = Post;
