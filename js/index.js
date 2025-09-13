const win = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let xIndex = [];
let oIndex = [];
let gameStatus = Array(9).fill('');
let currentPlayer = 'X';

function cellSign(index) {
  const currCell = document.getElementById(index);
  if (currCell.innerHTML === '' && currentPlayer === 'X') {
    currCell.style.color = '#545454';
    currCell.innerHTML = currentPlayer;
    gameStatus[index] = currentPlayer;
    xIndex.push(index);
    checkWinner(xIndex, currentPlayer);
    currentPlayer = 'O';
    if (gameStatus.some(cell => cell === '')) {
      setTimeout(computerMove, 500);
    }
  }
}

function computerMove() {
  const emptyCells = gameStatus.map((cell, idx) => cell === '' ? idx : null).filter(i => i !== null);
  if (emptyCells.length > 0) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const cell = document.getElementById(randomIndex);
    cell.style.color = 'white';
    cell.innerHTML = 'O';
    gameStatus[randomIndex] = 'O';
    oIndex.push(randomIndex);
    checkWinner(oIndex, 'O');
    currentPlayer = 'X';
  }
}

function checkWinner(index, cplayer) {
  let winnerCells = null;
  for (const pattern of win) {
    if (pattern.every(cell => index.includes(cell))) {
      winnerCells = pattern;
      highlightCells(winnerCells);
      setTimeout(endGame, 500, cplayer, 'Winner!');
      const nameEl = document.getElementById('winner-name');
      const msgEl = document.getElementById('winner-message');
      if (cplayer === 'X') {
        nameEl.style.color = 'rgb(75, 75, 75)';
        msgEl.style.color = 'white';
      } else {
        nameEl.style.color = 'white';
        msgEl.style.color = 'rgb(75, 75, 75)';
      }
      return;
    }
  }

  if (gameStatus.every(cell => cell !== '')) {
    document.querySelectorAll('.cells').forEach(cell => {
      cell.style.backgroundColor = 'rgba(3, 205, 207, 0.1)';
    });
    setTimeout(endGame, 500, 'XO', 'Draw!');
    document.getElementById('winner-message').innerHTML = 'Draw!';
  }
}

function highlightCells(cells) {
  for (const idx of cells) {
    document.getElementById(idx).style.backgroundColor = 'rgba(3, 205, 207, 0.1)';
  }
  document.querySelectorAll('.cells').forEach(cell => cell.style.pointerEvents = 'none');
}

function endGame(winner, message) {
  document.getElementById('winner-name').innerHTML = winner;
  document.getElementById('winner-message').innerHTML = message;
  document.getElementById('result-div').style.display = 'flex';
  document.getElementById('cell-group').style.display = 'none';
}

function restartGame() {
  document.querySelectorAll('.cells').forEach(cell => {
    cell.innerHTML = '';
    cell.style.pointerEvents = 'auto';
    cell.style.backgroundColor = '#14bdac';
  });
  currentPlayer = 'X';
  xIndex = [];
  oIndex = [];
  gameStatus = Array(9).fill('');
  document.getElementById('result-div').style.display = 'none';
  document.getElementById('cell-group').style.display = 'grid';
}
