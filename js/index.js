'use strict';

var output = document.getElementById('output');
var rock = document.getElementById('button_rock');
var paper = document.getElementById('button_paper');
var scissors = document.getElementById('button_scissors');
var newGame = document.getElementById('newGame');
var playerWin = document.getElementById('playerWin');
var computerWin = document.getElementById('computerWin');
var games = document.getElementById('games');
var buttons = document.querySelectorAll('.player-move');
var params = {
  playerResults: 0,
  computerResults: 0,
  numberGames: 0,
  playerPick: 0,
  computerPick: 0
};

/* petla przechodzaca przez wszystkie elementy z klasa player-move */

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        params.playerPick = this.getAttribute('data-move');
        params.computerPick = playerMove();
        compare(params.playerPick);
    })
}

function playerMove(movement) {
  return Math.floor((Math.random() * 3) + 1);
}

function replace(movement) {
  var results = ['paper', 'rock', 'scissors'];
  return results[movement-1];
}

function wonLose(numberGames) {
  if (params.numberGames == 0 && params.playerResults > params.computerResults) {
  output.innerHTML = 'YOU WON THE ENTIRE GAME!!! <br>' + 'you choose ' + replace(params.playerPick) + '<br>' + 'computer choose ' + replace(params.computerPick);
  }
  else if (params.numberGames == 0 && params.playerResults < params.computerResults) {
  output.innerHTML = 'YOU LOSE. COMPUTER WON THE ENTIRE GAME!!! <br>' + 'you choose ' + replace(params.playerPick) + '<br>' + 'computer choose ' + replace(params.computerPick);;
  }
  else if (params.numberGames == 0 && params.playerResults == params.computerResults) {
  output.innerHTML = 'DRAW!!! <br>' + 'you choose ' + replace(params.playerPick) + '<br>' + 'computer choose ' + replace(params.computerPick);;
  }
}

// funkcja sprawdzająca czy dalsza gra jest możliwa
function continueGame() {
  if (params.numberGames <= 0) {
    output.innerHTML += '<br>Game over, please press the new game button!';
    rock.disabled = true;
    paper.disabled = true;
    scissors.disabled = true;
  }
}

// funkcja porównująca wybory
function compare() {
  if (params.playerPick == params.computerPick) {
    output.innerHTML = 'Draw';
    continueGame();
    return;
  } else if (
    (params.computerPick == 2 && params.playerPick == 3) || 
    (params.computerPick == 3 && params.playerPick == 1) ||
    (params.computerPick == 1 && params.playerPick == 2)) {
      output.innerHTML = 'YOU LOSE: you choose ' + replace(params.playerPick) + '<br>' + 'Computer chose ' + replace(params.computerPick);
      params.computerResults++;
  } else {
    output.innerHTML = 'YOU WON: you choose ' + replace(params.playerPick) + '<br>' + 'Computer chose ' + replace(params.computerPick);
    params.playerResults++;
  }
  
  params.numberGames--;
  games.innerHTML = 'Number of round: ' + params.numberGames;
  wonLose(params.numberGames);
  summary.innerHTML = params.playerResults + ' : ' + params.computerResults;
  continueGame();
}

// funkcja resetuje wynik
function resetResults() {
  if (params.playerResults != 0 || params.computerResults != 0 ) {
    params.playerResults = 0;
    params.computerResults = 0;
    summary.innerHTML = params.playerResults + ' : ' + params.computerResults;
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;
    output.innerHTML = "";
  }
}

newGame.addEventListener('click', function() {
  params.numberGames = prompt('Enter the number of games')
  resetResults();
  if (!isNaN (params.numberGames) && params.numberGames != 0) { 
    games.innerHTML = 'Numer of round: ' + params.numberGames;
  }
  else {
    games.innerHTML = 'Enter the number of games';
  }
})