let score = 0;
let startX, startY;

function initGame() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    score = 0;
    document.getElementById('score').innerText = score;
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        grid.appendChild(tile);
    }
    addRandomTile();
    addRandomTile();
    initTouchEvents(); // 初始化触摸事件
}

function addRandomTile() {
    const tiles = document.querySelectorAll('.tile');
    const emptyTiles = Array.from(tiles).filter(tile => !tile.innerText);
    if (emptyTiles.length === 0) return; // 没有空位时不添加
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    randomTile.innerText = Math.random() < 0.9 ? 2 : 4;
    randomTile.setAttribute('data-value', randomTile.innerText);
}

document.getElementById('restart').addEventListener('click', initGame);

window.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    switch (event.key) {
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
    addRandomTile();
    updateScore();
}

function moveUp() {
    for (let col = 0; col < 4; col++) {
        const tiles = [];
        for (let row = 0; row < 4; row++) {
            tiles.push(getTileValue(row, col));
        }
        const newTiles = mergeTiles(tiles);
        for (let row = 0; row < 4; row++) {
            setTileValue(row, col, newTiles[row]);
        }
    }
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        const tiles = [];
        for (let row = 3; row >= 0; row--) {
            tiles.push(getTileValue(row, col));
        }
        const newTiles = mergeTiles(tiles);
        for (let row = 3; row >= 0; row--) {
            setTileValue(row, col, newTiles[3 - row]);
        }
    }
}

function moveLeft() {
    for (let row = 0; row < 4; row++) {
        const tiles = [];
        for (let col = 0; col < 4; col++) {
            tiles.push(getTileValue(row, col));
        }
        const newTiles = mergeTiles(tiles);
        for (let col = 0; col < 4; col++) {
            setTileValue(row, col, newTiles[col]);
        }
    }
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        const tiles = [];
        for (let col = 3; col >= 0; col--) {
            tiles.push(getTileValue(row, col));
        }
        const newTiles = mergeTiles(tiles);
        for (let col = 3; col >= 0; col--) {
            setTileValue(row, col, newTiles[3 - col]);
        }
    }
}

function getTileValue(row, col) {
    const index = row * 4 + col;
    const tile = document.querySelectorAll('.tile')[index];
    return parseInt(tile.innerText) || 0;
}

function setTileValue(row, col, value) {
    const index = row * 4 + col;
    const tile = document.querySelectorAll('.tile')[index];
    tile.innerText = value ? value : '';
    tile.setAttribute('data-value', value);
}

function mergeTiles(tiles) {
    const newTiles = tiles.filter(tile => tile !== 0);
    for (let i = 0; i < newTiles.length - 1; i++) {
        if (newTiles[i] === newTiles[i + 1]) {
            newTiles[i] *= 2;
            score += newTiles[i]; // 更新分数
            newTiles.splice(i + 1, 1);
        }
    }
    while (newTiles.length < 4) {
        newTiles.push(0);
    }
    return newTiles;
}

function updateScore() {
    document.getElementById('score').innerText = score;
}

function initTouchEvents() {
    const grid = document.getElementById('grid');
    grid.addEventListener('touchstart', handleTouchStart, false);
    grid.addEventListener('touchend', handleTouchEnd, false);

    // 禁止游戏区域滑动
    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();  // 禁止整个页面滚动
    }, { passive: false });
}

function handleTouchStart(event) {
    event.preventDefault();  // 禁止滚动
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
}

function handleTouchEnd(event) {
    event.preventDefault();  // 禁止滚动
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
        // 水平滑动
        if (deltaX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else if (Math.abs(deltaY) > MIN_SWIPE_DISTANCE) {
        // 垂直滑动
        if (deltaY > 0) {
            moveDown();
        } else {
            moveUp();
        }
    }

    addRandomTile();
    updateScore();
}

initGame();
