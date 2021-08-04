const express = require("express");

const app = express();

app.use("/", (req, res) => {
  console.log("hey this is main url");
  res.send("hello");
});

app.listen("5000", () => {
  console.log("Backend is running");
});
