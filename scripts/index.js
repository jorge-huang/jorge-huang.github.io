var QUADRANT_SIZE = 30;

var ENTRANCE_ID = -8;
var EXIT_ID = -88;

var rows = 20;
var cols = 20;
var graph = [];
var start = [19, 0];
var end = [0, 19];

var godModeItem = {
    id: -888,
    pos: [14, 17],
    enabled: false
}

var gold = {
    id: 0,
    total: 0
};

var wall = {
    id: 1
}

createTable(rows, cols, graph,
    createWalls,
    createEntranceAndExit,
    createGodMode,
    createGold);

var player = document.getElementById('player');
var [x, y] = start;
document.addEventListener('keydown', keyDownEventHandler);

function createGold(graph) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (graph[i][j] === gold.id) {
                document.getElementById(`${i}-${j}`).classList.add('gold-coin');
            }
        }
    }
}

function createGodMode(graph) {
    const [i, j] = godModeItem.pos;
    graph[i][j] = godModeItem.id;
    document.getElementById(`${i}-${j}`).classList.add('god-mode-item');
}

function createWalls(graph) {
    const colorsHex = ['#99857A', '#C67B5C', '#E27B58', '#FF9D6F', '#663926', '#8E6A5A'];
    const walls = [[0, 0], [0, 8], [0, 9], [0, 11], [1, 2], [1, 4], [1, 5], [1, 6], [1, 11], [1, 13], [1, 14], [1, 17], [1, 19], [2, 1], [2, 2], [2, 3], [2, 4], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13], [2, 14], [2, 16], [2, 17], [2, 19], [3, 3], [3, 5], [3, 6], [3, 7], [3, 8], [3, 16], [3, 19], [4, 0], [4, 5], [4, 6], [4, 8], [4, 10], [4, 12], [4, 13], [4, 14], [4, 17], [4, 18], [4, 19], [5, 2], [5, 6], [5, 9], [5, 10], [5, 13], [5, 15], [5, 17], [6, 2], [6, 3], [6, 4], [6, 8], [6, 11], [6, 15], [6, 17], [6, 18], [7, 0], [7, 1], [7, 6], [7, 7], [7, 10], [7, 11], [7, 12], [7, 14], [7, 15], [7, 17], [8, 1], [8, 3], [8, 4], [8, 13], [8, 15], [9, 1], [9, 4], [9, 7], [9, 8], [9, 11], [9, 12], [9, 13], [9, 16], [9, 17], [10, 2], [10, 3], [10, 7], [10, 8], [10, 9], [10, 12], [10, 17], [11, 2], [11, 3], [11, 4], [11, 9], [11, 15], [11, 17], [11, 19], [12, 0], [12, 2], [12, 3], [12, 4], [12, 6], [12, 7], [12, 9], [12, 10], [12, 12], [12, 15], [12, 19], [13, 0], [13, 2], [13, 9], [13, 10], [13, 13], [13, 14], [13, 17], [14, 4], [14, 5], [14, 6], [14, 7], [14, 11], [14, 12], [14, 16], [14, 18], [14, 19], [15, 0], [15, 3], [15, 8], [15, 11], [15, 12], [15, 13], [15, 15], [15, 18], [16, 0], [16, 1], [16, 3], [16, 6], [16, 8], [16, 9], [16, 10], [16, 11], [16, 12], [16, 17], [17, 0], [17, 1], [17, 5], [17, 6], [17, 8], [17, 10], [17, 14], [17, 17], [17, 19], [18, 7], [18, 10], [18, 12], [18, 19], [19, 2], [19, 5], [19, 9], [19, 10], [19, 11], [19, 12], [19, 13], [19, 14], [19, 16]];
    let rockColor = 0;
    walls.forEach(wall => {
        const [i, j] = wall;
        const rockEl = document.createElement('table');
        rockEl.style.margin = 0;
        const upperBound = 5;
        for (let i = 0; i < upperBound; i++) {
            const rowEl = document.createElement('tr');
            for (let j = 0; j < upperBound; j++) {
                const colEl = document.createElement('td');
                colEl.style.width = `${upperBound}px`;
                colEl.style.height = `${upperBound}px`;
                colEl.style.backgroundColor = colorsHex[rockColor++ % colorsHex.length];
                rowEl.appendChild(colEl);
            }
            rockEl.appendChild(rowEl);
        }
        rockEl.style.margin = '0 auto';
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
            graph[i].push(gold.id);
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
    const offsetAmt = QUADRANT_SIZE + 1;
    switch (event.key) {
        case "ArrowUp":
            nextX = x - 1;
            nextTop = -1 * offsetAmt;
            event.preventDefault();
            break;
        case "ArrowDown":
            nextX = x + 1;
            nextTop = offsetAmt;
            event.preventDefault();
            break;
        case "ArrowLeft":
            nextY = y - 1;
            nextLeft = -1 * offsetAmt;
            event.preventDefault();
            break;
        case "ArrowRight":
            nextY = y + 1;
            nextLeft = offsetAmt;
            event.preventDefault();
            break;
    }

    if (nextX < 0 || nextX >= graph.length ||
        nextY < 0 || nextY >= graph[0].length) {
        return;
    }

    if (!godModeItem.enabled && graph[nextX][nextY] === wall.id) {
        return;
    }

    x = nextX;
    y = nextY;
    player.style.top = `${parseInt(getComputedStyle(player).top.split('p')[0]) + nextTop}px`;
    player.style.left = `${parseInt(getComputedStyle(player).left.split('p')[0]) + nextLeft}px`;

    document.getElementById('msg').innerText = graph[x][y] === EXIT_ID ? 'nice!' : 'find the exit!';
    if (graph[x][y] === godModeItem.id) {
        document.getElementById('player').classList.add('god-mode');
        document.getElementById(`${x}-${y}`).classList.remove('god-mode-item');
        godModeItem.enabled = true;

        setTimeout(() => {
            document.getElementById('player').classList.remove('god-mode');
            godModeItem.enabled = false;
            if (graph[x][y] === wall.id) {
                document.getElementById('msg').innerHTML = 'GAME OVER';
            }
        }, 5 * 1000);
    } else if (graph[x][y] === gold.id) {
        gold.total++;
        document.getElementById(`${x}-${y}`).classList.remove('gold-coin');
        document.getElementById('gold-total').innerText = gold.total;
        graph[x][y] = -1;
    }
}