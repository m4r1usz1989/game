'use strict';

var output = document.getElementById('output');
var rock = document.getElementById('button_rock');
var paper = document.getElementById('button_paper');
var scissors = document.getElementById('button_scissors');
var newGame = document.getElementById('newGame');
var playerPick;
var computerPick;
var playerWin = document.getElementById('playerWin');
var computerWin = document.getElementById('computerWin');
var playerResults = 0;
var computerResults = 0;
var games = document.getElementById('games');
var numberGames;

function playerMove(movement) {
  return Math.floor((Math.random() * 3) + 1);
}

function replace(movement) {
  var results = ['paper', 'rock', 'scissors'];
  return results[movement-1];
}

function wonLose(numberGames) {
  if (numberGames == 0 && playerResults > computerResults) {
  output.innerHTML = 'YOU WON THE ENTIRE GAME!!! <br>' + 'you choose ' + replace(playerPick) + '<br>' + 'computer choose ' + replace(computerPick);
  }
  else if (numberGames == 0 && playerResults < computerResults) {
  output.innerHTML = 'YOU LOSE. COMPUTER WON THE ENTIRE GAME!!! <br>' + 'you choose ' + replace(playerPick) + '<br>' + 'computer choose ' + replace(computerPick);;
  }
  else if (numberGames == 0 && playerResults == computerResults) {
  output.innerHTML = 'DRAW!!! <br>' + 'you choose ' + replace(playerPick) + '<br>' + 'computer choose ' + replace(computerPick);;
  }
}

// funkcja sprawdzająca czy dalsza gra jest możliwa
function continueGame() {
  if (numberGames <= 0) {
    output.innerHTML += '<br>Game over, please press the new game button!';
    rock.disabled = true;
    paper.disabled = true;
    scissors.disabled = true;
  }
}

// funkcja porównująca wybory
function compare() {
  if (playerPick == computerPick) {
    output.innerHTML = 'Draw';
    continueGame();
    return;
  } else if (
    (computerPick == 2 && playerPick == 3) || 
    (computerPick == 3 && playerPick == 1) ||
    (computerPick == 1 && playerPick == 2)) {
      output.innerHTML = 'YOU LOSE: you choose ' + replace(playerPick) + '<br>' + 'Computer chose ' + replace(computerPick);
      computerResults++;
  } else {
    output.innerHTML = 'YOU WON: you choose ' + replace(playerPick) + '<br>' + 'Computer chose ' + replace(computerPick);
    playerResults++;
  }
  
  numberGames--;
  games.innerHTML = 'Number of round: ' + numberGames;
  wonLose(numberGames);
  summary.innerHTML = playerResults + ' : ' + computerResults;
  continueGame();
}

// funkcja resetuje wynik
function resetResults() {
  if (playerResults != 0 || computerResults != 0 ) {
    playerResults = 0;
    computerResults = 0;
    summary.innerHTML = playerResults + ' : ' + computerResults;
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;
    output.innerHTML = "";
  }
}

rock.addEventListener('click', function (){
  playerPick = 2;
  computerPick = playerMove();
  compare(playerPick);
})

paper.addEventListener('click', function (){
  playerPick = 1;
  computerPick = playerMove();
  compare(playerPick);
})

scissors.addEventListener('click', function() {
  playerPick = 3;
  computerPick = playerMove();
  compare(playerPick);
})

newGame.addEventListener('click', function() {
  numberGames = prompt('Enter the number of games')
  resetResults();
  if (!isNaN (numberGames) && numberGames != 0) {	
    games.innerHTML = 'Numer of round: ' + numberGames;
  }
  else {
    games.innerHTML = 'Enter the number of games';
  }
})