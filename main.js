let divBoard = document.querySelector('.div__board');
let display = document.querySelector('.display');
let scoreX = document.getElementById('score__x');
let scoreO = document.getElementById('score__o');
let board;
let cells;
let result;
let totalScoreX = 0;
let totalScoreO = 0;
const ai = 'X';
const human = 'O';
let currentMessage = 'Iniciar ou escolher jogador';
let currentPlayer = ai;

function initializeGame() {
  updateScore(scoreX, scoreO);
  updateMessage(currentMessage);
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  initializeBoard();
  setTimeout(() => {
    bestMove();
  }, 1000);
}

function initializeBoard() {
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
  cells = document.querySelectorAll('.cell');
}

function makeMove(cell, indexI, indexJ) {
  if (currentPlayer === human && board[indexI][indexJ] === '') {
    board[indexI][indexJ] = human;
    showSymbol(cell);
    let result = checkWinner();
    if(result) {
      displayResult(result);
      return;
    }
    currentPlayer = ai;
    currentMessage = 'Vez da IA';
    updateMessage(currentMessage);
    setTimeout(() => {
      bestMove();
    }, 1000);
  } else {
    let message = document.querySelector('.message');
    message.classList.add('error');
    updateMessage('Movimento inválido');
    display.classList.add('display__error');
    setTimeout(() => {
      message.classList.remove('error');
      display.classList.remove('display__error');
      updateMessage(currentMessage);
    }, 900);
  }
}

function showSymbol(cell) {
  let symbol = document.createElement('i');
  if(currentPlayer === human) {
    symbol.classList.add('circle');
  } 
  if(currentPlayer === ai) {
    symbol.classList.add('fa-solid');
    symbol.classList.add('fa-xmark');
  }
  cell.appendChild(symbol);
}

function equals3(a, b, c) {
  return (a == b && b == c && a != '');
}

function checkWinner() {
  let winner = null;
  // Horizontal
  for(let i = 0; i < 3; i++) {
    if(equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }
  // Vertical
  for(let i = 0; i < 3; i++) {
    if(equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }
  // Diagonal
  if(equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if(equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        openSpots++;
      }
    }
  }

  if(winner === null && openSpots === 0) {
    return 'Empate';
  } else {
    return winner;
  }
}

function displayResult(winner) {
  if(winner !== 'Empate') {
    drawWinner();
    winner === 'X' ? totalScoreX++ : totalScoreO++;
    updateScore(scoreX, scoreO);
  }
  display.textContent = 'Fim da partida!';
  endMatch();
  setTimeout(() => {
    shoWResult(winner);
  }, 3000);
}

function drawWinner() {
  let winnerCells = [];
  // Horizontal
  for(let i = 0; i < 3; i++) {
    if(equals3(board[i][0], board[i][1], board[i][2])) {
      winnerCells = [i * 3, i * 3 + 1, i * 3 + 2];
    }
  }
  // Vertical
  for(let i = 0; i < 3; i++) {
    if(equals3(board[0][i], board[1][i], board[2][i])) {
      winnerCells = [i, 3 + i, 6 + i];
    }
  }
  // Diagonal
  if(equals3(board[0][0], board[1][1], board[2][2])) {
    winnerCells = [0, 4, 8];
  }
  if(equals3(board[2][0], board[1][1], board[0][2])) {
    winnerCells = [6, 4, 2];
  }

  winnerCells.forEach(cell => {
    cells[cell].classList.add('winner__cell');
  });
}

function toggleActiveBoard() {
  let scoreboardX = document.querySelector('.scoreboard__x');
  let scoreboardO = document.querySelector('.scoreboard__o');
  if(currentPlayer === human) {
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
  scoreX.innerHTML = totalScoreX;
  scoreO.innerHTML = totalScoreO;
}

function endMatch() {
  setTimeout(() => {
    cells.forEach(cell => {
      cell.classList.add('cell--none');
    });
  }, 1000);
}

function shoWResult(winner) {
  divBoard.innerHTML = '';
  divBoard.classList.add('div__board--result');
  if (winner === ai) {
    divBoard.innerHTML = `
    <div class="show__result">
      <div class="symbols">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <p class="result">Vencedor!</p>
      <button class="restart" onclick="initializeGame()">Jogar Novamente</button>
    </div>
    `;
  } else if (winner === human) {
    divBoard.innerHTML = `
    <div class="show__result">
      <div class="symbols">
        <i class="circle"></i>
      </div>
      <p class="result">Vencedor!</p>
      <button class="restart" onclick="initializeGame()">Jogar Novamente</button>
    </div>
    `;
  } else {
    divBoard.innerHTML = `
      <div class="show__result">
        <div class="symbols">
          <i class="fa-solid fa-xmark"></i>
          <i class="circle"></i>
        </div>
        <p class="result">Empate!</p>
        <button class="restart" onclick="initializeGame()">Jogar Novamente</button>
      </div>
    `;
  }
}

function randomMove() {
  let i = parseInt(Math.random() * 2 + 1);
  let j = parseInt(Math.random() * 2 + 1);
  board[i][j] = ai;
  let cell = cells[i * 3 + j];
  showSymbol(cell);
  currentPlayer = human;
  currentMessage = 'Sua vez';
  updateMessage(currentMessage);
}

initializeGame();