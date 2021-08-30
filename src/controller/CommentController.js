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

const likeComment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    const error = new Error("Like cannot be saved");
    error.statusCode = 500;
    error.data = errors.array();
    return next(error);
  }

  const id = req.body.id;
  const backLike = req.body.backLike;
  const likeCount = backLike ? -1 : 1;

  try {
    Comment.findByIdAndUpdate(
      { _id: id },
      { $inc: { like_count: likeCount } },
      function (err, comment) {
        if (err) {
          return next(err);
        }

        res.status(200).json({ message: "Like have been saved." });
      }
    );
  } catch (err) {
    next(err);
  }
};

const unlikeComment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    const error = new Error("Like cannot be saved");
    error.statusCode = 500;
    error.data = errors.array();
    return next(error);
  }

  const id = req.body.id;
  const backUnlike = req.body.backUnlike;
  const unlikeCount = backUnlike ? -1 : 1;

  try {
    Comment.findByIdAndUpdate(
      { _id: id },
      { $inc: { like_count: unlikeCount } },
      function (err, comment) {
        if (err) {
          return next(err);
        }

        res.status(200).json({ message: "Unlike have been saved." });
      }
    );
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    const error = new Error("Comment could not delete.");
    error.statusCode = 500;
    error.data = errors.array();
    return next(error);
  }
  const comment_id = req.body.id;

  Comment.findByIdAndDelete({ _id: comment_id }, function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Comment was deleted successfully." });
  });
};

module.exports = {
  createComment,
  likeComment,
  unlikeComment,
  deleteComment,
};
