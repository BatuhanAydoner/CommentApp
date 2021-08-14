const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required."],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required."],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: [6, "Password has to be bigger and equal than 6 characters"],
    },
    nickname: {
      type: String,
      unique: true,
      required: [true, "Nickname is required."],
    },
    image_path: {
      type: String,
      default: "",
    },
    posts: {
      type: [
        { post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" } },
      ],
    },
    comments: {
      type: [
        {
          comment_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Comment id is required."],
            ref: "Comments",
          },
        },
      ],
    },
    saved: {
      type: [
        {
          post_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Post id is required."],
            ref: "Posts",
          },
        },
      ],
    },
    created_at: {
      type: Date,
      required: true,
    },
  },
  { collection: "Users", timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
