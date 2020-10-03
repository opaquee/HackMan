let map;
let id;
let x;
let y;

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

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
            }
            if (map[i][j] == 1) {
                el.classList.add('wall');
            }
            else if (map[i][j] >= 100 && map[i][j] < 200) {
                const pacman = document.createElement("IMG");
                pacman.setAttribute("src", "./assets/sprites/pacman.png");
                pacman.setAttribute("width", "100%");
                pacman.setAttribute("height", "100%");
                pacman.classList.add("sprite");
                el.append(pacman);
            }
            else if (map[i][j] >= 200) {
                const ghost = document.createElement("IMG");
                ghost.setAttribute("src", "./assets/sprites/pink_ghost.png");
                ghost.setAttribute("width", "100%");
                ghost.setAttribute("height", "100%");
                ghost.classList.add("sprite");
                el.append(ghost);
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
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 200, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, id, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    createMap();
};

document.addEventListener("keydown", event => {
    event.preventDefault();
    // Left
    if (event.keyCode === 37) {
        if (x - 1 >= 0 && map[x-1][y] == 0) {
            deleteMap();
            map[x][y] = 0;
            x--;
            map[x][y] = id;
            createMap();
        }
        else if (x - 1 >= 0 && map[x-1][y] >= 200 && id < 200) {
            deleteMap();
            map[x][y] = 0;
            id = 201;
            x = 7;
            y = 7;
            map[x][y] = id;
            createMap();
        }
    }

    // Up
    else if (event.keyCode === 38) {
        if (y >= 0 && map[x][y-1] == 0) {
            deleteMap();
            map[x][y] = 0;
            y--;
            map[x][y] = id;
            createMap();
        }
        else if (y >= 0 && map[x][y-1] >= 200 && id < 200) {
            deleteMap();
            map[x][y] = 0;
            id = 201;
            x = 7;
            y = 7;
            map[x][y] = id;
            createMap();
        }
    }

    // Right
    else if (event.keyCode === 39) {
        if (x < map[x].length && map[x+1][y] == 0) {
            deleteMap();
            map[x][y] = 0;
            x++;
            map[x][y] = id;
            createMap();
        }
        else if (x < map[x].length && map[x+1][y] >= 200 && id < 200) {
            deleteMap();
            map[x][y] = 0;
            id = 201;
            x = 7;
            y = 7;
            map[x][y] = id;
            createMap();
        }
    }

    // Down
    else if (event.keyCode === 40) {
        if (y < map.length && map[x][y+1] == 0) {
            deleteMap();
            map[x][y] = 0;
            y++;
            map[x][y] = id;
            createMap();
        }
        else if (y < map[x].length && map[x][y+1] >= 200 && id < 200) {
            deleteMap();
            map[x][y] = 0;
            id = 201;
            x = 7;
            y = 7;
            map[x][y] = id;
            createMap();
        }
    }
    console.log(x, y);
});