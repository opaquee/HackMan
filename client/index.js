const main = () => {
    const map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    for (let i = 0; i < map.length; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < map[i].length; j++) {
            const el = document.createElement("div");
            el.classList.add("map-element");
            row.append(el);
            if (map[i][j]) {
                el.classList.add('wall');
            }
        }
        document.getElementById("map").append(row);
    }
};