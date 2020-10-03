/*
const socket = window.io('ws://localhost:8080/echo`');

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

var input = document.getElementById("input");
var output = document.getElementById("output");
var socket = new WebSocket("ws://localhost:8080/echo");

socket.onopen = function () {
    output.innerHTML += "Status: Connected\n";
};

socket.onmessage = function (e) {
    output.innerHTML += "Server: " + e.data + "\n";
};

function send() {
    socket.send(input.value);
    input.value = "";
}
