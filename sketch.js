let cells = document.querySelectorAll('.cell');
let display = document.querySelector('.display');
let scoreX = document.getElementById('score__x');
let scoreO = document.getElementById('score__o');
let board;
let result;
let totalScoreX = 0;
let totalScoreO = 0;
let ai = 'X';
let human = 'O';
let currentMessage = 'Iniciar ou escolher jogador';
let currentPlayer = ai;

function initializeGame() {
  updateScore(scoreX, scoreO);
  updateMessage()
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
  const divBoard = document.querySelector('.div__board');
  divBoard.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => makeMove(cell, i, j));
      divBoard.appendChild(cell);
    }
  }
}

function makeMove(cell, indexI, indexJ) {
  if (board[indexI][indexJ] === '') {
    // Call AI move function and game logic here
    board[indexI][indexJ] = human;
    showSymbol(cell);
    let result = checkWinner();
    if(result) {
      displayResult(result);
      return;
    }
    currentPlayer = ai;
    updateMessage();
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
    symbol.classList.add('fa-regular');
    symbol.classList.add('fa-circle');
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
      winner = board[i][0]
    }
  }
  // Vertical
  for(let i = 0; i < 3; i++) {
    if(equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i]
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
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if(winner == null && openSpots == 0) {
    return 'Empate';
  } else {
    return winner;
  }
}

function displayResult(result) {
  if(result == 'Empate') {
    display.textContent = `${result}!`;
  } else {
    result === 'X' ? totalScoreX++ : totalScoreO++;
    updateScore(scoreX, scoreO);
    display.textContent = `Jogador ${result} é o campeão!`;
  }
}

function updateMessage() {
  currentMessage = currentPlayer === human ? 'Sua vez' : 'Vez da IA';
  display.innerHTML = currentMessage;
}

function updateScore(scoreX, scoreO) {
  scoreX.innerHTML = totalScoreX;
  scoreO.innerHTML = totalScoreO;
}

initializeGame();