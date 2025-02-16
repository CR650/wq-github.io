let grid = [];
let score = 0;
let startX, startY;
let gameOver = false; // 记录游戏是否结束
let soundPlayed = false;
let playedScores = []; // 用来跟踪分数区间是否已播放过音效

// 加载音频
const scoreSound = new Audio('source/wq.mp3'); // 确保路径正确

function initGame() {
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;
    gameOver = false;  // 重置游戏失败状态
    playedScores = []; // 重置播放过的分数区间
    updateGrid();
    addRandomTile();
    addRandomTile();
    updateScore();
    updateGameStatus();
}

function addRandomTile() {
    if (gameOver) return; // 如果游戏结束，停止添加新的格子
    
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
    document.getElementById('score').innerText = `分数: ${score}`;
    
    // 检查分数达到特定值并播放音频
    if (score >= 100 && !playedScores.includes(100)) {
        playedScores.push(100);  // 标记分数 100 已经播放
        playScoreSound();
    }
    if (score >= 200 && !playedScores.includes(200)) {
        playedScores.push(200);  // 标记分数 200 已经播放
        playScoreSound();
    }
    if (score >= 300 && !playedScores.includes(300)) {
        playedScores.push(300);  // 标记分数 300 已经播放
        playScoreSound();
    }
    if (score >= 400 && !playedScores.includes(400)) {
        playedScores.push(400);  // 标记分数 400 已经播放
        playScoreSound();
    }
    if (score >= 500 && !playedScores.includes(500)) {
        playedScores.push(500);  // 标记分数 500 已经播放
        playScoreSound();
    }
    if (score >= 600 && !playedScores.includes(600)) {
        playedScores.push(600);  // 标记分数 500 已经播放
        playScoreSound();
    }
    if (score >= 700 && !playedScores.includes(700)) {
        playedScores.push(700);  // 标记分数 500 已经播放
        playScoreSound();
    }
    if (score >= 700 && !playedScores.includes(700)) {
        playedScores.push(700);  // 标记分数 500 已经播放
        playScoreSound();
    }
    if (score >= 800 && !playedScores.includes(800)) {
        playedScores.push(800);  // 标记分数 500 已经播放
        playScoreSound();
    }
    if (score >= 900 && !playedScores.includes(900)) {
        playedScores.push(900);  // 标记分数 500 已经播放
        playScoreSound();
    }
    if (score >= 1000 && !playedScores.includes(1000)) {
        playedScores.push(1000);  // 标记分数 500 已经播放
        playScoreSound();
    }
}

function playScoreSound() {
    if (!soundPlayed) {
        scoreSound.play();
        soundPlayed = true;
        // 音频播放完毕后重置标记
        scoreSound.onended = function() {
            soundPlayed = false;
        };
    }
}

// 检查游戏失败
function checkGameOver() {
    // 检查是否还有空格
    const emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }
    if (emptyCells.length > 0) return false;

    // 检查是否还有可合并的格子
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (col < 3 && grid[row][col] === grid[row][col + 1]) return false; // 检查右边
            if (row < 3 && grid[row][col] === grid[row + 1][col]) return false; // 检查下边
        }
    }
    return true; // 如果没有空格且没有可以合并的格子，游戏结束
}

function gameOverHandler() {
    gameOver = true;
    document.getElementById('game-over').style.display = 'block'; // 显示游戏结束提示
    disableControls(); // 禁用滑动和键盘事件
}

// 禁用滑动和键盘事件
function disableControls() {
    window.removeEventListener('keydown', handleKeyPress);
    document.getElementById('grid').removeEventListener('touchstart', handleTouchStart);
    document.getElementById('grid').removeEventListener('touchend', handleTouchEnd);
}

function updateGameStatus() {
    if (checkGameOver()) {
        gameOverHandler();
    }
}

window.addEventListener('keydown', (e) => {
    if (gameOver) return;
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
    updateGameStatus();
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
    updateGameStatus();
}

function moveLeft() {
    for (let row = 0; row < 4; row++) {
        const newRow = merge(grid[row]);
        grid[row] = newRow;
    }
    addRandomTile();
    updateGrid();
    updateScore();
    updateGameStatus();
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        const newRow = merge(grid[row].reverse()).reverse();
        grid[row] = newRow;
    }
    addRandomTile();
    updateGrid();
    updateScore();
    updateGameStatus();
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

// 触摸事件处理
function initTouchEvents() {
    const gridElement = document.getElementById('grid');
    gridElement.addEventListener('touchstart', handleTouchStart, false);
    gridElement.addEventListener('touchend', handleTouchEnd, false);
}

function handleTouchStart(event) {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
}

function handleTouchEnd(event) {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // 水平滑动
        if (deltaX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else {
        // 垂直滑动
        if (deltaY > 0) {
            moveDown();
        } else {
            moveUp();
        }
    }
    addRandomTile();
    updateScore();
    updateGameStatus();
}

// 重新开始游戏
function restartGame() {
    document.getElementById('game-over').style.display = 'none'; // 隐藏游戏结束提示
    initGame(); // 重新初始化游戏
}

// 初始化游戏并绑定触摸事件
initGame();
initTouchEvents();
