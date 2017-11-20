require('dotenv').config();
const express = require("express");
const parser = require("body-parser");
const path = require("path");

const api = require("./server/api/index.js");

const app = express();

// middleware
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Routes
app.use(express.static(path.resolve(__dirname, "./server/public")));
app.use("/api", api);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
