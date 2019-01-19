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
  computerPick: 0,
  progress: []
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
    showModal();
  endResults.innerHTML = 'YOU WON THE ENTIRE GAME!!! <br>' + 'you choose ' + replace(params.playerPick) + '<br>' + 'computer choose ' + replace(params.computerPick);
  }
  else if (params.numberGames == 0 && params.playerResults < params.computerResults) {
    showModal();
  endResults.innerHTML = 'YOU LOSE. COMPUTER WON THE ENTIRE GAME!!! <br>' + 'you choose ' + replace(params.playerPick) + '<br>' + 'computer choose ' + replace(params.computerPick);;
  }
  else if (params.numberGames == 0 && params.playerResults == params.computerResults) {
    showModal();
  endResults.innerHTML = 'DRAW!!! <br>' + 'you choose ' + replace(params.playerPick) + '<br>' + 'computer choose ' + replace(params.computerPick);;
  }
}

// funkcja sprawdzająca czy dalsza gra jest możliwa
function continueGame() {
  if (params.numberGames <= 0) {
    table();
    showModal();
    endResults.innerHTML += '<br>Game over, please press the new game button!';
    rock.disabled = true;
    paper.disabled = true;
    scissors.disabled = true;
  }
}

// funkcja porównująca wybory
function compare() {
  if (params.playerPick == params.computerPick) {
    output.innerHTML = 'Draw';
    params.progress.push({
      player: params.playerPick, 
      computer: params.computerPick, 
      winner: 'Draw',
      game: params.playerResults + ':' + params.computerResults
    });
    continueGame();
    return;
  } else if (
    (params.computerPick == 2 && params.playerPick == 3) || 
    (params.computerPick == 3 && params.playerPick == 1) ||
    (params.computerPick == 1 && params.playerPick == 2)) {
      output.innerHTML = 'YOU LOSE: you choose ' + replace(params.playerPick) + '<br>' + 'Computer chose ' + replace(params.computerPick);
      params.computerResults++;
      params.progress.push({
      player: params.playerPick, 
      computer: params.computerPick, 
      winner: 'Computer',
      game: params.playerResults + ':' + params.computerResults
    });
  } else {
    output.innerHTML = 'YOU WON: you choose ' + replace(params.playerPick) + '<br>' + 'Computer chose ' + replace(params.computerPick);
    params.playerResults++;
    params.progress.push({
      player: params.playerPick, 
      computer: params.computerPick, 
      winner: 'Player',
      game: params.playerResults + ':' + params.computerResults
    });
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

// modals
function modalClassRemove() {
    var modals = document.querySelectorAll('.modal');
    for(var i = 0; i < modals.length; i++) {
      modals[i].classList.remove('show');
    }
  };
  
 function showModal() {
  var modals = document.querySelectorAll('.modal');
  for(var i = 0; i < modals.length; i++) {
    modals[i].classList.add('show');
  }
  document.querySelector('.overlay').classList.add('show');
 }

  var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
  };
  
  var closeButtons = document.querySelectorAll('.modal .close');
  
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }
  
  document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  
  var modals = document.querySelectorAll('.modal');
  
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    });
  }

  // score table
function table(){
  var html = ' <table>' + '<tr><td>Numer rundy</td><td>Ruch gracza</td><td>Ruch komputera</td><td>Wynik rundy</td><td>Wynik gry</td></tr>';
  for(var i = 0; i < params.progress.length; i++) {
    html += '<tr><td>' + (i + 1) + '</td><td>' + replace(params.progress[i].player) + '</td><td>' + replace(params.progress[i].computer) + '</td><td>' + params.progress[i].winner + '</td><td>' + params.progress[i].game + '</td></tr>';
  }
html += '</table>';

  document.getElementById('scoreTable').innerHTML = html;
}



