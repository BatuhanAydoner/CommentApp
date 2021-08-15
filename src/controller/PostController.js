const Post = require("../model/Post");
const User = require("../model/User");
const { validationResult } = require("express-validator");

const createPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Post could not be saved");
    error.statusCode = 500;
    error.data = errors.array();
    return next(error);
  }

  const user_id = req.body.user_id;
  const title = req.body.title;

  try {
    const newPost = Post({
      title,
      creator: user_id,
    });

    newPost
      .save()
      .then((post) => {
        return User.findById(user_id);
      })
      .then((user) => {
        user.posts.push(newPost);
        return user.save();
      })
      .then((result) => {
        res.status(200).json({ message: "Post saved successfully." });
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
};
