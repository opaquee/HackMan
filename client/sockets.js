const socket = window.io('ws://localhost:8080/echo');

socket.on("connect", () => {
  console.log("Client connected!");
});

// TODO: Listen to heartbeat data
socket.on('heartbeat', (data) => {
  console.log(data);
});

socket.on("disconnect", () => {
  console.log("Client disconnected from server.");
});

const move = (direction) => {
  switch(direction) {
    case 'left':
      socket.emit('onMoveLeft', 'onMoveLeft');
      break
    case 'right':
      socket.emit('onMoveRight', 'onMoveRight');
      break
    default:
      break
  }
}

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

leftButton.addEventListener("click", helloWorld);
rightButton.addEventListener("click", helloWorld);
