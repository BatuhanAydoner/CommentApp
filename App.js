const express = require("express");
const mongoose = require("mongoose");
const connect = require("./src/db/database");
const path = require("path");
const userRouter = require("./src/router/User_Router");

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ message: message, data: data });
});

connect(() => {
  app.listen(3000, () => {
    console.log("Port 3000 is listening.");
  });
});
