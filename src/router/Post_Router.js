const router = require("express").Router();
const postController = require("../controller/PostController");
const { body } = require("express-validator");

router.post(
  "/post-comment",
  [
    body("user_id").trim().notEmpty().withMessage("user_id is required."),
    body("title").trim().notEmpty().withMessage("title is cannot be empty"),
  ],
  postController.createPost
);

module.exports = router;
