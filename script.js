let score = 0;
let grid = [];
let startX, startY;

function initGame() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    grid = [];
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;

    // 创建 16 个格子
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        gridElement.appendChild(tile);
        grid.push(tile);
    }
    addRandomTile();
    addRandomTile();
    initTouchEvents();
}

function addRandomTile() {
    const emptyTiles = grid.filter(tile => !tile.innerText);
    if (emptyTiles.length === 0) return; // 如果没有空格子，停止添加新格子
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    randomTile.innerText = value;
    randomTile.setAttribute('data-value', value);
}

document.getElementById('restart').addEventListener('click', initGame);
window.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp': moveUp(); break;
        case 'ArrowDown': moveDown(); break;
        case 'ArrowLeft': moveLeft(); break;
        case 'ArrowRight': moveRight(); break;
    }
    addRandomTile();
    updateScore();
}

function moveUp() { processMove(0, -1); }
function moveDown() { processMove(0, 1); }
function moveLeft() { processMove(-1, 0); }
function moveRight() { processMove(1, 0); }

function processMove(dx, dy) {
    const tiles = [];
    // 这里是根据滑动方向（dx 和 dy）来处理每一列或者每一行的合并
    for (let row = 0; row < 4; row++) {
        const line = [];
        for (let col = 0; col < 4; col++) {
            const x = dx === 0 ? row : col;
            const y = dy === 0 ? col : row;
            line.push(getTileValue(x, y));
        }
        const newLine = mergeTiles(line);
        for (let col = 0; col < 4; col++) {
            const x = dx === 0 ? row : col;
            const y = dy === 0 ? col : row;
            setTileValue(x, y, newLine[col]);
        }
    }
}

function getTileValue(row, col) {
    const index = row * 4 + col;
    const tile = grid[index];
    return parseInt(tile.innerText) || 0;
}

function setTileValue(row, col, value) {
    const index = row * 4 + col;
    const tile = grid[index];
    tile.innerText = value ? value : '';
    tile.setAttribute('data-value', value);
}

function mergeTiles(tiles) {
    const nonEmptyTiles = tiles.filter(val => val !== 0);
    for (let i = 0; i < nonEmptyTiles.length - 1; i++) {
        if (nonEmptyTiles[i] === nonEmptyTiles[i + 1]) {
            nonEmptyTiles[i] *= 2;
            score += nonEmptyTiles[i];
            nonEmptyTiles.splice(i + 1, 1);
        }
    }
    while (nonEmptyTiles.length < 4) nonEmptyTiles.push(0);
    return nonEmptyTiles;
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

function initTouchEvents() {
    const gridElement = document.getElementById('grid');
    gridElement.addEventListener('touchstart', handleTouchStart, false);
    gridElement.addEventListener('touchmove', handleTouchMove, false);
    gridElement.addEventListener('touchend', handleTouchEnd, false);
}

function handleTouchStart(event) {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    event.preventDefault();
}

function handleTouchMove(event) {
    event.preventDefault();
}

function handleTouchEnd(event) {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) moveRight();
        else moveLeft();
    } else {
        if (deltaY > 0) moveDown();
        else moveUp();
    }

    addRandomTile();
    updateScore();
}

initGame();
