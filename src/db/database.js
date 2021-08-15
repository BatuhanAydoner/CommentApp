const mongoose = require("mongoose");
const env = require("dotenv");

const connect = (callback) => {
  mongoose
    .connect(process.env.PATH_MONGODB, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((_) => callback())
    .catch((error) => console.log(error));
};

module.exports = connect;
