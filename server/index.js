require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const port = process.env.PORT || 5000;

// middlewares
// Parse JSON bodies (as sent by API clients)
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/", require("./src/routes/authenticationRoutes"));
app.use("/api/project", require("./src/routes/dashboardRoutes"));
app.use("/api/messages", require("./src/routes/messagesRoutes"));

// // socket.io connection
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//   });
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// The server will start right after the connection to the database is established.
mongoose
  .connect(process.env.MONGO_CONNECT_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
