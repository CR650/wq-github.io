let grid = [];
let score = 0;

function initGame() {
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;
    updateGrid();
    addRandomTile();
    addRandomTile();
    updateScore();
}

function addRandomTile() {
    const emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }
    if (emptyCells.length === 0) return;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    grid[randomCell.row][randomCell.col] = value;
    updateGrid();
}

function updateGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            const value = grid[row][col];
            if (value !== 0) {
                tile.innerText = value;
                tile.setAttribute('data-value', value);
            }
            gridElement.appendChild(tile);
        }
    }
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
});

function moveUp() {
    for (let col = 0; col < 4; col++) {
        const column = [];
        for (let row = 0; row < 4; row++) {
            column.push(grid[row][col]);
        }
        const newColumn = merge(column);
        for (let row = 0; row < 4; row++) {
            grid[row][col] = newColumn[row];
        }
    }
    addRandomTile();
    updateGrid();
    updateScore();
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        const column = [];
        for (let row = 3; row >= 0; row--) {
            column.push(grid[row][col]);
        }
        const newColumn = merge(column);
        for (let row = 3; row >= 0; row--) {
            grid[row][col] = newColumn[3 - row];
        }
    }
    addRandomTile();
    updateGrid();
    updateScore();
}

function moveLeft() {
    for (let row = 0; row < 4; row++) {
        const newRow = merge(grid[row]);
        grid[row] = newRow;
    }
    addRandomTile();
    updateGrid();
    updateScore();
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        const newRow = merge(grid[row].reverse()).reverse();
        grid[row] = newRow;
    }
    addRandomTile();
    updateGrid();
    updateScore();
}

function merge(arr) {
    const newArr = arr.filter(val => val !== 0);
    for (let i = 0; i < newArr.length - 1; i++) {
        if (newArr[i] === newArr[i + 1]) {
            newArr[i] *= 2;
            score += newArr[i];
            newArr.splice(i + 1, 1);
        }
    }
    while (newArr.length < 4) {
        newArr.push(0);
    }
    return newArr;
}

initGame();
