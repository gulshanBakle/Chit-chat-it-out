const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New connection connected successfully:)");

  socket.on("join", ({ name, room }) => {
    console.log(`Name: ${name} Room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("Users disconnected:(");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server listeneing at port ${PORT}`));
