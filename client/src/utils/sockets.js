import io from "socket.io-client";

const socket = io("ws://localhost:8000/chat");

socket.on("connect", () => {
  console.log("Client connected!");
});

// TODO: Listen to heartbeat data
socket.on("heartbeat", (data) => {
  console.log(data);
});

socket.on("disconnect", () => {
  console.log("Client disconnected from server.");
});

const move = (direction) => {
  console.log(direction);
  switch (direction) {
    case "left":
      socket.emit("msg", "onMoveLeft");
      break;
    case "right":
      socket.emit("msg", "onMoveRight");
      break;
    default:
      break;
  }
};

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

leftButton.addEventListener("click", () => move("left"));
rightButton.addEventListener("click", () => move("right"));
