var ENTRANCE_ID = -8;
var EXIT_ID = -88;
var QUADRANT_SIZE = 35;
var rows = 25;
var cols = 25;
var graph = [];
var start = [24, 0];
var end = [0, 24];
createTable(rows, cols, graph,
    createWalls,
    createEntranceAndExit);

var player = document.getElementById('player');
var [x, y] = start;
document.addEventListener('keydown', keyDownEventHandler);

function createWalls(graph) {
    const colorsHex = ['#99857A', '#C67B5C', '#E27B58', '#FF9D6F', '#663926', '#8E6A5A'];
    const walls = [[0, 0], [0, 4], [0, 6], [0, 7], [0, 16], [0, 17], [0, 18], [0, 20], [0, 21], [0, 23], [1, 0], [1, 1], [1, 2], [1, 9], [1, 12], [1, 14], [1, 15], [1, 16], [1, 18], [1, 23], [2, 3], [2, 4], [2, 11], [2, 12], [2, 20], [2, 21], [2, 22], [3, 0], [3, 4], [3, 5], [3, 8], [3, 9], [3, 10], [3, 11], [3, 16], [3, 17], [3, 18], [3, 19], [3, 20], [4, 1], [4, 10], [4, 11], [4, 13], [4, 15], [4, 16], [4, 18], [4, 23], [4, 24], [5, 2], [5, 3], [5, 4], [5, 5], [5, 8], [5, 12], [5, 13], [5, 14], [5, 15], [5, 18], [5, 19], [5, 21], [6, 1], [6, 2], [6, 4], [6, 5], [6, 6], [6, 10], [6, 11], [6, 12], [6, 18], [6, 21], [6, 22], [6, 23], [7, 5], [7, 15], [7, 16], [7, 18], [7, 20], [7, 22], [7, 23], [7, 24], [8, 0], [8, 2], [8, 6], [8, 10], [8, 11], [8, 13], [8, 17], [8, 22], [8, 24], [9, 0], [9, 2], [9, 5], [9, 7], [9, 11], [9, 16], [9, 17], [9, 20], [9, 21], [9, 24], [10, 2], [10, 8], [10, 10], [10, 11], [10, 12], [10, 14], [10, 17], [10, 18], [10, 24], [11, 1], [11, 2], [11, 3], [11, 4], [11, 6], [11, 10], [11, 12], [11, 13], [11, 18], [11, 20], [11, 21], [11, 22], [12, 3], [12, 5], [12, 6], [12, 7], [12, 13], [12, 15], [12, 16], [12, 18], [12, 19], [12, 20], [12, 21], [12, 22], [12, 24], [13, 1], [13, 2], [13, 11], [13, 13], [13, 16], [13, 22], [13, 24], [14, 5], [14, 6], [14, 7], [14, 8], [14, 10], [14, 11], [14, 12], [14, 13], [14, 17], [14, 18], [14, 20], [15, 2], [15, 6], [15, 8], [15, 10], [15, 11], [15, 12], [15, 13], [15, 14], [15, 16], [15, 17], [15, 18], [15, 20], [15, 22], [15, 23], [16, 3], [16, 5], [16, 8], [16, 10], [16, 11], [16, 13], [16, 17], [16, 19], [16, 20], [16, 23], [17, 1], [17, 3], [17, 4], [17, 5], [17, 6], [17, 11], [17, 15], [17, 16], [17, 19], [17, 20], [17, 22], [17, 23], [18, 1], [18, 6], [18, 8], [18, 10], [18, 12], [18, 14], [18, 15], [18, 16], [18, 17], [18, 19], [18, 23], [19, 2], [19, 3], [19, 4], [19, 8], [19, 10], [19, 16], [19, 17], [19, 19], [19, 21], [19, 23], [20, 0], [20, 1], [20, 6], [20, 7], [20, 8], [20, 10], [20, 14], [20, 15], [20, 19], [20, 23], [21, 0], [21, 4], [21, 6], [21, 11], [21, 12], [21, 14], [21, 18], [21, 19], [21, 20], [21, 21], [21, 23], [22, 2], [22, 4], [22, 6], [22, 8], [22, 11], [22, 12], [22, 14], [22, 16], [22, 17], [22, 18], [22, 19], [22, 21], [23, 0], [23, 2], [23, 4], [23, 5], [23, 6], [23, 8], [23, 19], [23, 22], [23, 23], [23, 24], [24, 2], [24, 8], [24, 9], [24, 10], [24, 13], [24, 15], [24, 16]];
    let rockColor = 0;
    walls.forEach(wall => {
        const [i, j] = wall;
        const rockEl = document.createElement('table');
        rockEl.style.margin = 0;
        for (let i = 0; i < QUADRANT_SIZE / 5; i++) {
            const rowEl = document.createElement('tr');
            for (let j = 0; j < QUADRANT_SIZE / 5; j++) {
                const colEl = document.createElement('td');
                colEl.style.width = `5px`;
                colEl.style.height = `5px`;
                colEl.style.backgroundColor = colorsHex[rockColor++ % colorsHex.length];
                rowEl.appendChild(colEl);
            }
            rockEl.appendChild(rowEl);
        }

        document.getElementById(`${i}-${j}`).appendChild(rockEl);
        graph[i][j] = 1;
    });
}

function createEntranceAndExit(graph) {
    const [i, j] = start;
    graph[i][j] = ENTRANCE_ID;
    document.getElementById(`${i}-${j}`).style.backgroundColor = 'blue';

    const [k, l] = end;
    graph[k][l] = EXIT_ID;
    document.getElementById(`${k}-${l}`).style.backgroundColor = 'red';
    document.getElementById(`${k}-${l}`).innerText = 'E';
    document.getElementById(`${k}-${l}`).style.textAlign = 'center';
}

function createTable(rows, cols, graph, ...cb) {
    for (let i = 0; i < rows; i++) {
        graph[i] = []
        for (let j = 0; j < cols; j++) {
            graph[i].push(0);
        }
    }

    const tableEl = document.getElementById('shapes-table');

    for (let i = 0; i < rows; i++) {
        const rowEl = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const colEl = document.createElement('td');
            colEl.setAttribute('id', `${i}-${j}`);
            colEl.style.width = `${QUADRANT_SIZE}px`;
            colEl.style.height = `${QUADRANT_SIZE}px`;
            colEl.style.backgroundColor = '#444444';
            colEl.style.border = '1px solid black';

            rowEl.appendChild(colEl);
        }
        tableEl.appendChild(rowEl);
    }

    for (const fn of cb) {
        fn(graph);
    }
}

function keyDownEventHandler(event) {
    let nextX = x, nextY = y, nextTop = 0, nextLeft = 0;
    switch (event.key) {
        case "ArrowUp":
            nextX = x - 1;
            nextTop = -36;
            break;
        case "ArrowDown":
            nextX = x + 1;
            nextTop = 36
            break;
        case "ArrowLeft":
            nextY = y - 1;
            nextLeft = -36;
            break;
        case "ArrowRight":
            nextY = y + 1;
            nextLeft = 36;
            break;
    }

    if (nextX < 0 || nextX >= graph.length ||
        nextY < 0 || nextY >= graph[0].length ||
        graph[nextX][nextY] === 1) {
        return;
    }

    x = nextX;
    y = nextY;
    player.style.top = `${parseInt(getComputedStyle(player).top.split('p')[0]) + nextTop}px`;
    player.style.left = `${parseInt(getComputedStyle(player).left.split('p')[0]) + nextLeft}px`;

    console.log(graph[x][y]);
    document.getElementById('msg').innerText = graph[x][y] === EXIT_ID ? 'nice!' : 'find the exit!';
}