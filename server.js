const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 4001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("User connected");
  socket.join("main");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("question", data => {
    console.log(data);

    socket.broadcast.to("main").emit("receive question", data);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
