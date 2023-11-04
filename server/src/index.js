require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

const port = process.env.PORT || 5000;

// middlewares
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use("/", require("./routes/authRoutes"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// The server will start right after the connection to the database is established.
mongoose
  .connect(process.env.MONGO_CONNECT_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
