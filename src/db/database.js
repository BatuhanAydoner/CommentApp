const mongoose = require("mongoose");

const connect = (callback) => {
  mongoose
    .connect("mongodb://localhost/comment", {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((_) => callback())
    .catch((error) => console.log(error));
};

module.exports = connect;
