const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("share", data => {
    socket.join(data.token);
  });

  socket.on("unshare", data => {
    socket.leave(data.token);
  });

  socket.on("question", data => {
    socket.broadcast.to(data.token).emit("receive question", data);
  });

  socket.on("show answer", data => {
    socket.broadcast.to(data.token).emit("receive show answer", data);
  });

  socket.on("toggle highlighted", data => {
    socket.broadcast.to(data.token).emit("receive highlight", data);
  });

  socket.on("toggle hide", data => {
    socket.broadcast.to(data.token).emit("receive hide", data);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
