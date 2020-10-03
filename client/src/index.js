require("file-loader?name=[name].[ext]!../index.html");

import "./utils/sockets";

import pacmanImg from "../assets/sprites/pacman.png";
import pinkGhost from "../assets/sprites/pink_ghost.png";
import "../index.css";

let map;
let id;
let x;
let y;

let players = [
  {
    id: 100,
    isGhost: false,
    x: 7,
    y: 7,
  },
  {
    id: 101,
    isGhost: true,
    x: 7,
    y: 7,
  },
  {
    id: 102,
    isGhost: false,
    x: 7,
    y: 7,
  },
];

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const getPlayer = (id) => {
  return players.find((x) => x.id == id);
};

const createMap = () => {
  for (let i = 0; i < map.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < map[i].length; j++) {
      const el = document.createElement("div");
      el.classList.add("map-element");

      if (map[i][j] === id) {
        x = i;
        y = j;
        getPlayer(id).x = i;
        getPlayer(id).y = j;
      }
      if (map[i][j] == 1) {
        el.classList.add("wall");
      } else if (map[i][j] >= 100) {
        if (getPlayer(map[i][j]).isGhost) {
          const ghost = document.createElement("IMG");
          ghost.setAttribute("src", pinkGhost);
          ghost.setAttribute("width", "100%");
          ghost.setAttribute("height", "100%");
          ghost.classList.add("sprite");
          el.append(ghost);
        } else {
          const pacman = document.createElement("IMG");
          pacman.setAttribute("src", pacmanImg);
          pacman.setAttribute("width", "100%");
          pacman.setAttribute("height", "100%");
          pacman.classList.add("sprite");
          el.append(pacman);
        }
      }
      row.append(el);
    }
    document.getElementById("map").append(row);
  }
};

const deleteMap = () => {
  removeAllChildNodes(document.getElementById("map"));
};

const main = () => {
  // Set player id
  id = 100;

  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, id, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 101, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  createMap();
};

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  // Left
  if (event.keyCode === 37) {
    // Open Move
    if (x - 1 >= 0 && map[x - 1][y] == 0) {
      deleteMap();
      map[x][y] = 0;
      x--;
      map[x][y] = id;
      createMap();
    }
    // Move pacman into ghost
    else if (
      x - 1 >= 0 &&
      getPlayer(map[x - 1][y]).isGhost &&
      getPlayer(id).isGhost == false
    ) {
      deleteMap();
      map[x][y] = 0;
      getPlayer(id).isGhost = true;
      x = 7;
      y = 7;
      getPlayer(id).x = x;
      getPlayer(id).y = y;
      map[x][y] = id;
      createMap();
    }
    // Move ghost into pacman
    else if (
      x - 1 >= 0 &&
      !getPlayer(map[x - 1][y]).isGhost &&
      getPlayer(id).isGhost
    ) {
      let temp_id = getPlayer(map[x - 1][y]).id;
      deleteMap();
      map[x][y] = 0;
      getPlayer(map[x - 1][y]).isGhost = true;
      getPlayer(map[x - 1][y]).x = 7;
      getPlayer(map[x - 1][y]).y = 7;
      map[x - 1][y] = id;
      map[7][7] = temp_id;
      createMap();
    }
  }

  // Up
  else if (event.keyCode === 38) {
    // Open Move
    if (y >= 0 && map[x][y - 1] == 0) {
      deleteMap();
      map[x][y] = 0;
      y--;
      map[x][y] = id;
      createMap();
    }
    // Move into ghost
    else if (
      y >= 0 &&
      getPlayer(map[x][y - 1]).isGhost &&
      getPlayer(id).isGhost == false
    ) {
      deleteMap();
      map[x][y] = 0;
      getPlayer(id).isGhost = true;
      x = 7;
      y = 7;
      getPlayer(id).x = x;
      getPlayer(id).y = y;
      map[x][y] = id;
      createMap();
    }
    // Move ghost into pacman
    else if (
      y >= 0 &&
      !getPlayer(map[x][y - 1]).isGhost &&
      getPlayer(id).isGhost
    ) {
      let temp_id = getPlayer(map[x][y - 1]).id;
      deleteMap();
      map[x][y] = 0;
      getPlayer(map[x][y - 1]).isGhost = true;
      getPlayer(map[x][y - 1]).x = 7;
      getPlayer(map[x][y - 1]).y = 7;
      map[x][y - 1] = id;
      map[7][7] = temp_id;
      createMap();
    }
  }

  // Right
  else if (event.keyCode === 39) {
    // Open Move
    if (x < map[x].length && map[x + 1][y] == 0) {
      deleteMap();
      map[x][y] = 0;
      x++;
      map[x][y] = id;
      createMap();
    }
    // Move into ghost
    else if (
      x < map[x].length &&
      getPlayer(map[x + 1][y]).isGhost &&
      getPlayer(id).isGhost == false
    ) {
      deleteMap();
      map[x][y] = 0;
      getPlayer(id).isGhost = true;
      x = 7;
      y = 7;
      getPlayer(id).x = x;
      getPlayer(id).y = y;
      map[x][y] = id;
      createMap();
    }
    // Move ghost into pacman
    else if (
      x < map[x].length &&
      !getPlayer(map[x + 1][y]).isGhost &&
      getPlayer(id).isGhost
    ) {
      let temp_id = getPlayer(map[x + 1][y]).id;
      deleteMap();
      map[x][y] = 0;
      getPlayer(map[x + 1][y]).isGhost = true;
      getPlayer(map[x + 1][y]).x = 7;
      getPlayer(map[x + 1][y]).y = 7;
      map[x + 1][y] = id;
      map[7][7] = temp_id;
      createMap();
    }
  }

  // Down
  else if (event.keyCode === 40) {
    // Open Move
    if (y < map.length && map[x][y + 1] == 0) {
      deleteMap();
      map[x][y] = 0;
      y++;
      map[x][y] = id;
      createMap();
    }
    // Move into ghost
    else if (
      y < map[x].length &&
      getPlayer(map[x][y + 1]).isGhost &&
      getPlayer(id).isGhost == false
    ) {
      deleteMap();
      map[x][y] = 0;
      getPlayer(id).isGhost = true;
      x = 7;
      y = 7;
      getPlayer(id).x = x;
      getPlayer(id).y = y;
      map[x][y] = id;
      createMap();
    }
    // Move ghost into pacman
    else if (
      y < map[x].length &&
      !getPlayer(map[x][y + 1]).isGhost &&
      getPlayer(id).isGhost
    ) {
      let temp_id = getPlayer(map[x][y + 1]).id;
      deleteMap();
      map[x][y] = 0;
      getPlayer(map[x][y + 1]).isGhost = true;
      getPlayer(map[x][y + 1]).x = 7;
      getPlayer(map[x][y + 1]).y = 7;
      map[x - 1][y] = id;
      map[7][7] = temp_id;
      createMap();
    }
  }
});

main();
