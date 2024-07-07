const divBoard = document.querySelector('.div__board');
const display = document.querySelector('.display');
const scoreX = document.getElementById('score__x');
const scoreO = document.getElementById('score__o');

const ai = 'X';
const human = 'O';

let gameState = {
  board: null,
  cells: [],
  result: null,
  totalScoreX: 0,
  totalScoreO: 0,
  currentMessage: null,
  currentPlayer: ai
}

function initializeGame() {
  initializeScores();
  initializeBoard();
  setTimeout(() => { bestMove() }, 1000);
}

function initializeScores() {
  gameState.currentMessage = 'Iniciar ou escolher jogador';
  updateScore(scoreX, scoreO);
  updateMessage(gameState.currentMessage);
}

function initializeBoard() {
  gameState.board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  divBoard.classList.remove('div__board--result');
  divBoard.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => makeMove(cell, i, j));
      divBoard.appendChild(cell);
    }
  }
  gameState.cells = document.querySelectorAll('.cell');
}

function makeMove(cell, indexI, indexJ) {
  if (gameState.currentPlayer === human && gameState.board[indexI][indexJ] === '') {
    gameState.board[indexI][indexJ] = human;
    showSymbol(cell);
    let result = checkWinner();
    if(result) {
      displayResult(result);
      return;
    }
    gameState.currentPlayer = ai;
    gameState.currentMessage = 'Vez da IA';
    updateMessage(gameState.currentMessage);
    setTimeout(() => { bestMove() }, 1000);
  } else {
    displayInvalidMove();
  }
}

function displayInvalidMove() {
  let message = document.querySelector('.message');
  message.classList.add('error');
  updateMessage('Movimento inválido');
  display.classList.add('display__error');
  setTimeout(() => {
    message.classList.remove('error');
    display.classList.remove('display__error');
    updateMessage(gameState.currentMessage);
  }, 900);
}

function showSymbol(cell) {
  let symbol = document.createElement('i');
  if(gameState.currentPlayer === human) {
    symbol.classList.add('circle');
  } 
  if(gameState.currentPlayer === ai) {
    symbol.classList.add('fa-solid');
    symbol.classList.add('fa-xmark');
  }
  cell.appendChild(symbol);
}

function equals3(a, b, c) {
  return (a == b && b == c && a != '');
}

function checkOpenSpots() {
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameState.board[i][j] === '') {
        openSpots++;
      }
    }
  }
  return openSpots;
}

function checkWinner() {
  const winConditions = [
    // Horizontal
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Vertical
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonal
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
  ];

  let winner = null;
  let openSpots = checkOpenSpots();

  winConditions.forEach(condition => {
    const [a, b, c] = condition;
    if (equals3(gameState.board[a[0]][a[1]], gameState.board[b[0]][b[1]], gameState.board[c[0]][c[1]])) {
     winner = gameState.board[a[0]][a[1]];
    }
  });

  if(winner === null && openSpots === 0) {
    return 'Empate';
  } else {
    return winner;
  }
}

function displayResult(winner) {
  if(winner !== 'Empate') {
    drawWinner();
    winner === 'X' ? gameState.totalScoreX++ : gameState.totalScoreO++;
    updateScore(scoreX, scoreO);
  }
  display.textContent = 'Fim da partida!';
  endMatch();
  setTimeout(() => {
    showResult(winner);
  }, 3000);
}

function drawWinner() {
  let winnerCells = [];
  // Horizontal
  for(let i = 0; i < 3; i++) {
    if(equals3(gameState.board[i][0], gameState.board[i][1], gameState.board[i][2])) {
      winnerCells = [i * 3, i * 3 + 1, i * 3 + 2];
    }
  }
  // Vertical
  for(let i = 0; i < 3; i++) {
    if(equals3(gameState.board[0][i], gameState.board[1][i], gameState.board[2][i])) {
      winnerCells = [i, 3 + i, 6 + i];
    }
  }
  // Diagonal
  if(equals3(gameState.board[0][0], gameState.board[1][1], gameState.board[2][2])) {
    winnerCells = [0, 4, 8];
  }
  if(equals3(gameState.board[2][0], gameState.board[1][1], gameState.board[0][2])) {
    winnerCells = [6, 4, 2];
  }

  winnerCells.forEach(cell => {
    gameState.cells[cell].classList.add('winner__cell');
  });
}

function toggleActiveBoard() {
  let scoreboardX = document.querySelector('.scoreboard__x');
  let scoreboardO = document.querySelector('.scoreboard__o');
  if(gameState.currentPlayer === human) {
    scoreboardX.classList.remove('scoreboard__active');
    scoreboardO.classList.add('scoreboard__active');
  } else {
    scoreboardO.classList.remove('scoreboard__active');
    scoreboardX.classList.add('scoreboard__active');
  }
}

function updateMessage(message) {
  toggleActiveBoard();
  display.innerHTML = message;
}

function updateScore(scoreX, scoreO) {
  scoreX.innerHTML = gameState.totalScoreX;
  scoreO.innerHTML = gameState.totalScoreO;
}

function endMatch() {
  setTimeout(() => {
    gameState.cells.forEach(cell => {
      cell.classList.add('cell--none');
    });
  }, 1000);
}

function showResult(winner) {
  let resultHTML = '';
  divBoard.innerHTML = '';
  divBoard.classList.add('div__board--result');
  if (winner === ai) {
    resultHTML = `
    <div class="show__result">
      <div class="symbols">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <p class="result">Vencedor!</p>
      <button class="restart">Jogar Novamente</button>
    </div>
    `;
  } else if (winner === human) {
    resultHTML = `
    <div class="show__result">
      <div class="symbols">
        <i class="circle"></i>
      </div>
      <p class="result">Vencedor!</p>
      <button class="restart">Jogar Novamente</button>
    </div>
    `;
  } else {
    resultHTML = `
      <div class="show__result">
        <div class="symbols">
          <i class="fa-solid fa-xmark"></i>
          <i class="circle"></i>
        </div>
        <p class="result">Empate!</p>
        <button class="restart">Jogar Novamente</button>
      </div>
    `;
  }

  divBoard.innerHTML = resultHTML;
  document.querySelector('.restart').addEventListener('click', initializeGame);
}

initializeGame();