const router = require("express").Router();
const { body } = require("express-validator");

const userController = require("../controller/UserController");

router.post(
  "/register",
  [
    body("firstname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Firstname cannot be smaller than 2 characters")
      .isLength({ max: 30 })
      .withMessage("Firstname cannot be bigger than 30 characters"),

    body("lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Lastname cannot be smaller than 2 characters")
      .isLength({ max: 30 })
      .withMessage("Lastname cannot be bigger than 30 characters"),

    body("email").trim().isEmail().withMessage("Invalid email"),

    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("nickname")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Nickname cannot be empty"),
  ],
  userController.signUp
);

module.exports = router;
