const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 4001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("share", data => {
    console.log(data);

    socket.join(data.token);
  });

  socket.on("unshare", data => {
    console.log("Unsharing");

    socket.leave(data.token);
  });

  socket.on("question", data => {
    console.log(data);

    socket.broadcast.to(data.token).emit("receive question", data);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
