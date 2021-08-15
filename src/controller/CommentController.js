const Comment = require("../model/Comment");
const Post = require("../model/Post");
const User = require("../model/User");
const { validationResult } = require("express-validator");

const createComment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Comment could not be saved");
    error.statusCode = 500;
    error.data = errors.array();
    return next(error);
  }

  const comment = req.body.comment;
  const post_id = req.body.post;
  const user_id = req.body.creator;

  try {
    const newComment = Comment({
      comment,
      post: post_id,
      creator: user_id,
    });

    newComment
      .save()
      .then((result) => {
        return Post.findById(post_id);
      })
      .then((post) => {
        post.comments.push(newComment);
        return post.save();
      })
      .then((result) => User.findById(user_id))
      .then((user) => {
        user.comments.push(newComment);
        return user.save();
      })
      .then((result) => {
        if (result) {
          res
            .status(200)
            .json({ message: "Comment have created succeessfully" });
        }
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
};
