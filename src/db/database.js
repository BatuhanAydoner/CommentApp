const mongoose = require("mongoose");
const env = require("dotenv");

const connect = (callback) => {
  mongoose
    .connect(process.env.PATH_LOCAL, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then((_) => callback())
    .catch((error) => console.log(error));
};

module.exports = connect;
