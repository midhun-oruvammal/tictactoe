/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
// eslint-disable-next-line max-len
const win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let xIndex = [];
let oIndex = [];
let gameStatus = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
function cellSign(index) {
    const currCell = document.getElementById(index);
    if (currCell.innerHTML === '') {
        if (currentPlayer === 'X') {
            document.getElementById(index).style.color = '#545454';
            currCell.innerHTML = currentPlayer;
            gameStatus[index] = currentPlayer;
            xIndex.push(index);
            checkWinner(xIndex, currentPlayer);
            currentPlayer = 'O';
        } else {
            document.getElementById(index).style.color = 'white';
            currCell.innerHTML = currentPlayer;
            gameStatus[index] = currentPlayer;
            oIndex.push(index);
            checkWinner(oIndex, currentPlayer);
            currentPlayer = 'X';
        }
    }
}

function checkWinner(index, cplayer) {
    let winnerCells = null;
    for (let i = 0; i < win.length; i += 1) {
        if (win[i].every((element) => index.includes(element))) {
            winnerCells = win[i];
            bgCells(winnerCells);
            setTimeout(endGame, 1000, cplayer, 'Winner!');
            if (cplayer === 'X') {
                document.getElementById('winner-name').style.color = 'rgb(75, 75, 75)';
                document.getElementById('winner-message').style.color = 'white';
            } else {
                document.getElementById('winner-name').style.color = 'white';
                document.getElementById('winner-message').style.color = 'rgb(75, 75, 75)';
            }
            return;
        }
    }
    if (gameStatus.every((element) => element !== '')) {
        for (let j = 0; j < 9; j += 1) {
            document.getElementById(j).style.backgroundColor = 'rgba(3, 205, 207, 0.1)';
        }
        setTimeout(endGame, 1000, 'XO', 'Draw!');
        document.getElementById('winner-message').innerHTML = 'Draw!';
    }
}

function bgCells(cells) {
    for (let j = 0; j < cells.length; j += 1) {
        document.getElementById(cells[j]).style.backgroundColor = 'rgba(3, 205, 207, 0.1)';
    }
    for (let i = 0; i < 9; i += 1) {
        document.getElementById(i).style.pointerEvents = 'none';
    }
}

function endGame(winner, message) {
    document.getElementById('winner-name').innerHTML = winner;
    document.getElementById('winner-message').innerHTML = message;
    document.getElementById('result-div').style.display = 'flex';
    document.getElementById('cell-group').style.display = 'none';
}

function restartGame() {
    for (let i = 0; i < 9; i += 1) {
        document.getElementById(i).innerHTML = '';
        document.getElementById(i).style.pointerEvents = 'auto';
        document.getElementById(i).style.backgroundColor = '#14bdac';
        currentPlayer = 'X';
        xIndex = [];
        oIndex = [];
        gameStatus = ['', '', '', '', '', '', '', '', ''];
        document.getElementById('result-div').style.display = 'none';
        document.getElementById('cell-group').style.display = 'grid';
    }
}
