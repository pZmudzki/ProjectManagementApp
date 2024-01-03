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
app.use("/api/notifications", require("./src/routes/notificationRoutes"));
app.use("/api/messages", require("./src/routes/messagesRoutes"));
app.use("/api/support", require("./src/routes/supportRoutes"));

// socket.io connection
let users = [];
io.on("connection", (socket) => {
  // When a user connects, store their user ID and socket ID
  socket.on("userConnected", (userId) => {
    users[userId] = socket.id;
  });

  // When you want to send a message to a specific user
  socket.on("sendMessage", (receiverId, message) => {
    if (users[receiverId]) {
      io.to(users[receiverId]).emit("receiveMessage", message);
    }
  });
});

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
