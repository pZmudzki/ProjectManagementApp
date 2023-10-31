const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const createUser = require("./controllers/UserController");

const port = 3000;

const app = express();

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/register", createUser);

mongoose
  .connect(
    "mongodb+srv://piotrzmudzki47:KiroxBolt321@cluster0.clmcsdd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port);
    console.log(`App listening on port ${port}`);
  });
