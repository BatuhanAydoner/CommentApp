const User = require("../model/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Sign up is failed.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const nickname = req.body.nickname;

  try {
    await User.findOne(
      { $or: [{ email: email }, { nickname: nickname }] },
      function (error, user) {
        if (user) {
          const error = new Error("User exists.");
          error.statusCode = 500;
          return next(error);
        }

        const newUser = User({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          nickname,
        });
        return newUser.save().then((user) => {
          if (!user) {
            const error = new Error("User could not be saved.");
            error.statusCode = 500;
            return next(error);
          }
          return res.status(200).json({ message: "User is saved." });
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
};
