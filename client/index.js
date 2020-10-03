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

                if (map[i][j] === id) {
                    x = i;
                    y = j;
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
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
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
        if (x - 1 >= 0 && map[x-1][y] !== 1) {
            deleteMap();
            map[x][y] = 0;
            x--;
            map[x][y] = 100;
            createMap();
        }
    }

    // Up
    else if (event.keyCode === 38) {
        if (y >= 0 && map[x][y-1] !== 1) {
            deleteMap();
            map[x][y] = 0;
            y--;
            map[x][y] = 100;
            createMap();
        }
    }

    // Right
    else if (event.keyCode === 39) {
        if (x < map[x].length && map[x+1][y] !== 1) {
            deleteMap();
            map[x][y] = 0;
            x++;
            map[x][y] = 100;
            createMap();
        }
    }

    // Down
    else if (event.keyCode === 40) {
        if (y < map.length && map[x][y+1] !== 1) {
            deleteMap();
            map[x][y] = 0;
            y++;
            map[x][y] = 100;
            createMap();
        }
    }
    console.log(x, y);
});