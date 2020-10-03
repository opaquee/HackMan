// const socket = window.io('ws://localhost:8080/echo');

var socket = new WebSocket('ws://localhost:8080/echo');

/*
socket.on("connect", () => {
  socket.send('Hello from the client!');
  console.log("Socket connected!");
});

socket.on("event", () => {
  console.log(`Receiving data: ${data}`);
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});
*/

socket.onopen = function () {
 console.log("connected");
};

socket.onmessage = function (e) {
  console.log(`Server: ${e.data}`);
};

function send() {
  socket.send("Ay wassup");
};
