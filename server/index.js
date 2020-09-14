const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const { addUsers, removeUser, getUser, getUserRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New connection connected successfully:)");

  socket.on("join", ({ name, room }, callback) => {
    console.log(`Name: ${name} Room: ${room}`);

    const { error, user } = addUsers({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `Hello! Welcome ${user.name} to ${user.room} room`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    socket.join(user.room);
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, message: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("Users disconnected:(");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server listeneing at port ${PORT}`));
