const socket = window.io('ws://localhost:8080/echo');

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

socket.onopen = () => {
  console.log("Connected boi");
};
