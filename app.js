/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, gamePlaying;
var dicePrevious, dice2Previous;
init(); //Initialize the game

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the random result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


    //3. Update the round number IF the number rolled WAS NOT 1
    if (dice1 !== 1 && dice2 !== 1) {
        //Add Score
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Next Player
        nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //Add activeplayer's currentscore to the global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    //Adding input box for user to choose winningScore
    var input = document.querySelector('.input-score').value
    var winningScore;

    if (input) {
        winningScore = input;
    } else {
        winningScore = 100;
    }

    //Check if player won the game (globalscore === 100)
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

//Note: we are passing in the init function so it'll activate WHEN a click is registered on the NEW GAME button. If we were to actually call it by adding the call operator [init()], then the init function would be IMMEDIATELY called!
document.querySelector(".btn-new").addEventListener("click", init);

//Created this function because we'd have this same code in both btn-roll & btn-hold eventListeners above. (DRY PRINCIPLE!)
function nextPlayer() {
  //Next player, reset
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); //ternary operator(if/else)
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //using classList.toggle instead of using if/else to add/remove 'active'
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //Making the dice disappear when the activePlayer changes
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

//Game initializing function that resets the scores to 0, activePlayer back to player 1 and making it display Player 1 and Player 2, etc.
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
