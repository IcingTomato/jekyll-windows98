class Minesweeper {
    constructor(container, rows = 9, cols = 9, mines = 10) {
        this.container = container;
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.board = [];
        this.gameOver = false;
        this.firstClick = true;
        this.remainingCells = rows * cols - mines;
        this.baseUrl = baseUrl || ''; // 从全局变量获取基础URL
        this.init();
    }

    init() {
        // 创建游戏容器
        this.container.style.width = 'fit-content';
        this.container.style.backgroundColor = '#c0c0c0';
        this.container.style.padding = '3px';
        this.container.style.border = '3px solid #c0c0c0';
        this.container.style.boxShadow = 'inset -1px -1px #808080, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf';

        // 创建顶部信息栏
        const infoBar = document.createElement('div');
        infoBar.style.display = 'flex';
        infoBar.style.justifyContent = 'space-between';
        infoBar.style.padding = '2px';
        infoBar.style.marginBottom = '3px';
        infoBar.style.backgroundColor = '#c0c0c0';
        infoBar.style.border = '2px solid #c0c0c0';
        infoBar.style.boxShadow = 'inset 1px 1px #808080, inset -1px -1px #fff, inset 2px 2px grey, inset -2px -2px #dfdfdf';

        // 剩余地雷数显示
        this.mineCounter = document.createElement('div');
        this.mineCounter.style.width = '40px';
        this.mineCounter.style.height = '26px';
        this.mineCounter.style.backgroundColor = '#000';
        this.mineCounter.style.margin = '2px 4px';
        this.mineCounter.style.boxShadow = 'inset 1px 1px #808080, inset -1px -1px #fff';
        this.mineCounter.style.display = 'flex';
        this.mineCounter.style.justifyContent = 'center';
        this.mineCounter.style.alignItems = 'center';
        this.mineCounter.style.gap = '0px';

        // 创建三个数字图片容器
        this.mineDigits = [];
        for (let i = 0; i < 3; i++) {
            const digitImg = document.createElement('img');
            digitImg.style.width = '12px';
            digitImg.style.height = '22px';
            digitImg.style.border = 'none';
            digitImg.style.boxShadow = 'none';
            this.mineCounter.appendChild(digitImg);
            this.mineDigits.push(digitImg);
        }
        this.updateMineCounter(this.mines);

        // 笑脸按钮
        this.smileButton = document.createElement('button');
        this.smileButton.style.width = '30px';
        this.smileButton.style.height = '30px';
        this.smileButton.style.padding = '0';
        this.smileButton.style.border = '2px solid #c0c0c0';
        this.smileButton.style.backgroundColor = '#c0c0c0';
        this.smileButton.style.boxShadow = 'inset -1px -1px #808080, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf';
        this.smileButton.style.cursor = 'pointer';
        this.smileButton.style.display = 'flex';
        this.smileButton.style.alignItems = 'center';
        this.smileButton.style.justifyContent = 'center';
        this.smileButton.onclick = () => this.reset();

        // 笑脸图片
        this.smileImg = document.createElement('img');
        this.smileImg.style.width = '20px';
        this.smileImg.style.height = '20px';
        this.smileImg.style.border = 'none';
        this.smileImg.style.boxShadow = 'none';
        this.smileImg.src = `${this.baseUrl}/assets/img/minesweeper/smile.png`;
        this.smileButton.appendChild(this.smileImg);

        // 计时器
        this.timer = document.createElement('div');
        this.timer.style.width = '40px';
        this.timer.style.height = '26px';
        this.timer.style.backgroundColor = '#000';
        this.timer.style.margin = '2px 4px';
        this.timer.style.boxShadow = 'inset 1px 1px #808080, inset -1px -1px #fff';
        this.timer.style.display = 'flex';
        this.timer.style.justifyContent = 'center';
        this.timer.style.alignItems = 'center';
        this.timer.style.gap = '0px';

        // 创建三个数字图片容器
        this.timerDigits = [];
        for (let i = 0; i < 3; i++) {
            const digitImg = document.createElement('img');
            digitImg.style.width = '12px';
            digitImg.style.height = '22px';
            digitImg.style.border = 'none';
            digitImg.style.boxShadow = 'none';
            this.timer.appendChild(digitImg);
            this.timerDigits.push(digitImg);
        }
        this.updateTimer(0);

        infoBar.appendChild(this.mineCounter);
        infoBar.appendChild(this.smileButton);
        infoBar.appendChild(this.timer);
        this.container.appendChild(infoBar);

        // 创建游戏板
        this.gameBoard = document.createElement('div');
        this.gameBoard.style.display = 'grid';
        this.gameBoard.style.gridTemplateColumns = `repeat(${this.cols}, 16px)`;
        this.gameBoard.style.gridTemplateRows = `repeat(${this.rows}, 16px)`; // 添加行高定义
        this.gameBoard.style.gap = '0'; // 移除间距
        this.gameBoard.style.backgroundColor = '#c0c0c0';
        this.gameBoard.style.border = '1px solid #c0c0c0';
        this.gameBoard.style.boxShadow = 'inset 1px 1px #808080, inset -1px -1px #fff, inset 2px 2px grey, inset -2px -2px #dfdfdf';

        // 初始化游戏板
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.cols; j++) {
                const cell = document.createElement('div');
                cell.style.width = '16px';
                cell.style.height = '16px';
                cell.style.boxSizing = 'border-box'; // 添加盒模型设置
                cell.style.margin = '0'; // 移除外边距
                cell.style.border = '1px solid #c0c0c0';
                cell.style.boxShadow = 'inset -1px -1px #808080, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf';
                cell.style.display = 'flex';
                cell.style.alignItems = 'center';
                cell.style.justifyContent = 'center';
                cell.style.fontFamily = 'Arial, sans-serif';
                cell.style.fontSize = '12px';
                cell.style.fontWeight = 'bold';
                cell.style.cursor = 'pointer';


                cell.addEventListener('click', () => this.handleClick(i, j));
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.handleRightClick(i, j);
                });

                this.gameBoard.appendChild(cell);
                this.board[i][j] = {
                    element: cell,
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                };
            }
        }

        this.container.appendChild(this.gameBoard);
        this.startTimer();

        // 在创建笑脸按钮后添加这些事件监听器
        this.smileButton.addEventListener('mousedown', () => {
            this.smileImg.src = `${this.baseUrl}/assets/img/minesweeper/ohh.png`;
        });

        this.smileButton.addEventListener('mouseup', () => {
            this.smileImg.src = `${this.baseUrl}/assets/img/minesweeper/smile.png`;
        });

        this.smileButton.addEventListener('mouseleave', () => {
            this.smileImg.src = `${this.baseUrl}/assets/img/minesweeper/smile.png`;
        });
    }

    updateMineCounter(value) {
        const digits = value.toString().padStart(3, '0');
        for (let i = 0; i < 3; i++) {
            this.mineDigits[i].src = `${this.baseUrl}/assets/img/minesweeper/digit${digits[i]}.png`;
        }
    }

    updateTimer(seconds) {
        const digits = seconds.toString().padStart(3, '0');
        for (let i = 0; i < 3; i++) {
            this.timerDigits[i].src = `${this.baseUrl}/assets/img/minesweeper/digit${digits[i]}.png`;
        }
    }

    startTimer() {
        let seconds = 0;
        this.timerInterval = setInterval(() => {
            if (!this.gameOver) {
                seconds++;
                this.updateTimer(seconds);
            }
        }, 1000);
    }

    reset() {
        clearInterval(this.timerInterval);
        this.container.innerHTML = '';
        this.gameOver = false;
        this.firstClick = true;
        this.remainingCells = this.rows * this.cols - this.mines;
        this.init();
    }

    placeMines(firstRow, firstCol) {
        let minesPlaced = 0;
        while (minesPlaced < this.mines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);

            if (!this.board[row][col].isMine &&
                (Math.abs(row - firstRow) > 1 || Math.abs(col - firstCol) > 1)) {
                this.board[row][col].isMine = true;
                minesPlaced++;
            }
        }

        // 计算每个格子周围的地雷数
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (!this.board[i][j].isMine) {
                    this.board[i][j].neighborMines = this.countNeighborMines(i, j);
                }
            }
        }
    }

    countNeighborMines(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < this.rows &&
                    newCol >= 0 && newCol < this.cols &&
                    this.board[newRow][newCol].isMine) {
                    count++;
                }
            }
        }
        return count;
    }

    handleClick(row, col) {
        if (this.gameOver || this.board[row][col].isFlagged) return;

        if (this.firstClick) {
            this.placeMines(row, col);
            this.firstClick = false;
        }

        if (this.board[row][col].isMine) {
            this.gameOver = true;
            this.revealAll();
            this.board[row][col].element.style.backgroundColor = '#ff0000';
            this.smileImg.src = `${this.baseUrl}/assets/img/minesweeper/dead.png`;
            clearInterval(this.timerInterval);
            return;
        }

        this.revealCell(row, col);

        if (this.remainingCells === 0) {
            this.gameOver = true;
            this.smileImg.src = `${this.baseUrl}/assets/img/minesweeper/win.png`;
            clearInterval(this.timerInterval);
        }
    }

    handleRightClick(row, col) {
        if (this.gameOver || this.board[row][col].isRevealed) return;

        const cell = this.board[row][col];

        cell.isFlagged = !cell.isFlagged;

        if (cell.isFlagged) {
            const flagImg = document.createElement('img');
            flagImg.src = `${this.baseUrl}/assets/img/minesweeper/flag.png`;
            flagImg.style.width = '14px';
            flagImg.style.height = '14px';
            flagImg.style.border = 'none';
            flagImg.style.boxShadow = 'none';
            cell.element.innerHTML = '';
            cell.element.appendChild(flagImg);
            this.mines--;
        } else {
            cell.element.innerHTML = '';
            this.mines++;
        }

        this.updateMineCounter(this.mines);
    }

    revealCell(row, col) {
        const cell = this.board[row][col];
        if (cell.isRevealed || cell.isFlagged) return;

        cell.isRevealed = true;
        this.remainingCells--;

        cell.element.style.backgroundColor = '#c0c0c0';
        cell.element.style.border = '1px solid #808080';
        cell.element.style.boxShadow = 'none';

        if (cell.neighborMines > 0) {
            const numberImg = document.createElement('img');
            numberImg.src = `${this.baseUrl}/assets/img/minesweeper/open${cell.neighborMines}.png`;
            numberImg.style.width = '16px';
            numberImg.style.height = '16px';
            numberImg.style.border = 'none';
            numberImg.style.boxShadow = 'none';
            cell.element.innerHTML = '';
            cell.element.appendChild(numberImg);
        } else {
            // 如果是空格，递归显示周围的格子
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (newRow >= 0 && newRow < this.rows &&
                        newCol >= 0 && newCol < this.cols) {
                        this.revealCell(newRow, newCol);
                    }
                }
            }
        }
    }

    revealAll() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.board[i][j];
                if (cell.isMine) {
                    const mineImg = document.createElement('img');
                    mineImg.src = `${this.baseUrl}/assets/img/minesweeper/mine.png`;
                    mineImg.style.width = '12px';
                    mineImg.style.height = '12px';
                    mineImg.style.border = 'none';
                    mineImg.style.boxShadow = 'none';
                    cell.element.innerHTML = '';
                    cell.element.appendChild(mineImg);
                    cell.element.style.backgroundColor = '#c0c0c0';
                    cell.element.style.border = '1px solid #808080';
                    cell.element.style.boxShadow = 'none';
                } else if (cell.isFlagged && !cell.isMine) {
                    const misflaggedImg = document.createElement('img');
                    misflaggedImg.src = `${this.baseUrl}/assets/img/minesweeper/misflagged.png`;
                    misflaggedImg.style.width = '14px';
                    misflaggedImg.style.height = '14px';
                    misflaggedImg.style.border = 'none';
                    misflaggedImg.style.boxShadow = 'none';
                    cell.element.innerHTML = '';
                    cell.element.appendChild(misflaggedImg);
                }
            }
        }
    }
}