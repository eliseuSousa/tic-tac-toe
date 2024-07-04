let scores = {
  'X': 1,
  'O': -1,
  'Empate': 0
};

function bestMove() {
  let bestScore = -Infinity;
  let move = null;
  let score;

  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if(board[i][j] === '') {
        board[i][j] = ai;
        score = minimax(board, 0, false);
        board[i][j] = '';
        if(score > bestScore) {
          bestScore = score;
          move = {i, j};
        }
      }
    }
  }
  
  if(move) makeBestMove(move);
}

function makeBestMove(move) {
  board[move.i][move.j] = ai;
  let cells = document.querySelectorAll('.cell');
  let cell = cells[move.i * 3 + move.j];
  showSymbol(cell);
  let result = checkWinner();
  if(result) {
    displayResult(result);
    return;
  }
  currentPlayer = human;
  currentMessage = 'Sua vez';
  updateMessage(currentMessage);
}

function maximizingPlayer(board, depth) {
  let bestScore = -Infinity;
  let score;
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) { 
      if(board[i][j] === '') {
        board[i][j] = ai;
        score = minimax(board, depth + 1, false);
        board[i][j] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
  }
  return bestScore;
}

function minimizingPlayer(board, depth) {
  let bestScore = Infinity;
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if(board[i][j] == '') {
        board[i][j] = human;
        let score = minimax(board, depth + 1, true);
        board[i][j] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
  }
  return bestScore;
}

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }
  if(isMaximizing) {
    return maximizingPlayer(board, depth);
  } else {
    return minimizingPlayer(board, depth);
  }
}