const socket = window.io('ws://localhost:8080');

socket.on("connect", () => {
  socket.send('Hello from the client!');
  console.log("Socket connected!");
});

socket.on("heartbeat", (data) => {
  console.log(`Receiving data: ${data}`);
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});
