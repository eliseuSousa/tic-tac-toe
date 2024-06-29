let cells = document.querySelectorAll('.cell');
let display = document.querySelector('.message');
//let firstMove = true;
let board;
let result;

let w, h;

let ai = 'X';
let human = 'O';
let currentPlayer = ai;

function initializeGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  initializeBoard();
  bestMove();
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
    checkWinner();
    showSymbol(cell);
    currentPlayer = ai;
    bestMove();
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

initializeGame();

result = checkWinner();
if(result != null) {
  if(result == 'Empate') {
    display.textContent = `${result}!`;
  } else {
    display.textContent = `Jogador ${result} é o campeão!`;
  }
} 

/*function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('container');
  w = width/3;
  h = height/3;
  if(firstMove) {
    let i = parseInt(Math.random() * 2 + 1);
    let j = parseInt(Math.random() * 2 + 1);
    board[i][j] = ai;
    firstMove = false;
  } else {
    bestMove();
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '') {
      
    }
  }
}

function draw() {
  background(249, 249, 249);
  textSize(32);
  strokeWeight(4);
  stroke('#659ABA');

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  stroke('#7B7B7B');
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  
  
}*/
