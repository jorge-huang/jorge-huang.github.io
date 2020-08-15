const QUADRANT_SIZE = 50;

function reset() {
    location.reload();
}

function getShapePath(shapeType = 'alien', accessory) {
    let baseImgPath = './assets/images/shapes/';

    baseImgPath += shapeType

    if (accessory) {
        baseImgPath += '-' + accessory
    }

    return baseImgPath += '.png'
}

function dfs(graph, i, j, rows, cols) {
    if (i >= rows || j >= cols ||
        i < 0 || j < 0 ||
        graph[i][j] === 0) {
        return;
    }

    graph[i][j] = 0;
    dfs(graph, i + 1, j, rows, cols);
    dfs(graph, i - 1, j, rows, cols);
    dfs(graph, i, j + 1, rows, cols);
    dfs(graph, i, j - 1, rows, cols);
}

function createTable(rows, cols, graph) {
    const colorsHex = ['#99857A', '#C67B5C', '#E27B58', '#FF9D6F', '#663926', '#8E6A5A'];
    const accessories = ['', 'hearts', 'mustache', 'sunglasses'];
    const tableEl = document.getElementById('shapes-table');
    for (let i = 0; i < rows; i++) {
        const rowEl = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const colEl = document.createElement('td');
            colEl.setAttribute('id', `${i}-${j}`);
            colEl.style.cursor = 'pointer';
            colEl.style.width = `${QUADRANT_SIZE}px`;
            colEl.style.height = `${QUADRANT_SIZE}px`;
            colEl.style.backgroundColor = colorsHex[(i + j) % colorsHex.length];

            // handling click event
            colEl.addEventListener('click', (event) => {
                const [row, col] = event.target.id.split('-');
                if (!row || !col || graph[row][col] === 1) {
                    return;
                }

                // adding image
                const shapeEl = document.createElement('img');
                shapeEl.setAttribute('src', getShapePath('alien', accessories[(i + j) % accessories.length]));
                shapeEl.classList.add('shape');
                shapeEl.style.width = `${QUADRANT_SIZE}px`;
                event.target.appendChild(shapeEl);

                // update graph
                graph[row][col] = 1;

                const graphCopy = [];
                for (let i = 0; i < rows; i++) {
                    graphCopy[i] = []
                    for (let j = 0; j < cols; j++) {
                        graphCopy[i].push(graph[i][j]);
                    }
                }

                // update colonies count
                let count = 0;
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        if (graphCopy[i][j] === 1) {
                            count++;
                            dfs(graphCopy, i, j, rows, cols);
                        }
                    }
                }

                const islandCount = document.getElementById('count');
                islandCount.innerText = count;
            })
            rowEl.appendChild(colEl);
        }
        tableEl.appendChild(rowEl);
    }
}

// const shapes = ['alien', 'burger', 'cupcake'];
// const accessories = ['hearts', 'mustache', 'sunglasses'];

const height = document.body.scrollHeight;
const width = document.body.scrollWidth;
const rows = Math.max(Math.round(height / QUADRANT_SIZE) - 10, 5);
const cols = Math.round(width / QUADRANT_SIZE) - 1;

const graph = [];
for (let i = 0; i < rows; i++) {
    graph[i] = []
    for (let j = 0; j < cols; j++) {
        graph[i].push(0);
    }
}

createTable(rows, cols, graph);