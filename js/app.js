//16 pairs of card icons to match
let cardIcon = [
  'fa-coffee', 'fa-coffee', 'fa-dog', 'fa-dog', 'fa-crow', 'fa-crow', 'fa-dragon', 'fa-dragon', 'fa-fire', 'fa-fire', 'fa-hippo', 'fa-hippo', 'fa-democrat', 'fa-democrat', 'fa-snowflake', 'fa-snowflake'
]
let board = document.getElementById('game-board');
let pickedCards = [];
let moves = 0;
let matches = 0;
let movesCount = document.getElementById('moves');
let star = 3;
let timeKeeper = document.querySelector('.timer');
let gameRunning = false;
let intervalID = window.setInterval(startTimer, 1000);
let sec = 0;
let min = 0;
let hour = 0;

(function() {
  startGame()
})();

function generateCards(icon) {
  return `<div class="card col3" data-card=${icon}><i class="fa ${icon}"></i></div>`;
}

function startGame() {
  let deck = shuffle(cardIcon).map(function(cardIcon) {
    return generateCards(cardIcon)
    });
  board.innerHTML = deck.join('');
  gameRunning = true;
  clickCards();
}

function clickCards() {
  board.addEventListener('click', function(event) {
    let et = event.target;
    if (gameRunning === true && moves < 1) {
      startTimer();
    }
    if (et.classList.contains('card') && !et.classList.contains('open') && !et.classList.contains('show') && !et.classList.contains('match') && pickedCards.length < 2) {
      pickedCards.push(et);
      et.classList.add('show', 'open');
    }
    compareCards(pickedCards);
    updateScore();
    winYet();
  })
}

function compareCards(cards) {
  if (pickedCards.length === 2) {
    if (cards[0].dataset.card === cards[1].dataset.card) {
      console.log('compare is true')
      //theres a match, add match class to the item.
      cards[0].classList.add('match');
      cards[1].classList.add('match');
      matches++;
      //reset the picked cards array for the next guess.
      pickedCards = [];
    } else {
      setTimeout( () => { 
        cards[0].classList.remove('show', 'open');
        cards[1].classList.remove('show', 'open');
        //reset the picked cards array for the next guess.
        pickedCards = []
      }, 1000);
    };
    moves++;
  }
}

function winYet() {
  if (matches === 8) {
    let gameDuration = timeKeeper.innerText;
    gameRunning = false;
    alert(`You win! Moves Taken: ${moves} Star Rating: ${star} Game Time: ${gameDuration}\n
    Would you like to play again?`);
    resetTimer();
    startGame();
  }
}
//make all the boxes stay the same size
//add a timer for the game
//based on Daniel Hug's (https://jsfiddle.net/Daniel_Hug/pvk6p/) Thanks!

function startTimer() {
  if (gameRunning === true) {
    sec++;
    if (sec > 60) {
      sec = 0;
      min++;
    } else if (min > 60) {
      min = 0;
      hour++;
    }
    timeKeeper.textContent = (hour ? (hour >9 ? hour : "0" + hour) : "00") + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ':' + (sec > 9 ? sec : "0" + sec);
    }
  };

function resetTimer() {
  clearInterval(intervalID);
  resetCounters();
}

//sets timer and counters back to zero for new game.
function resetCounters() {
  sec = 0;
  min = 0;
  hour = 0;
  timeKeeper.textContent = "00:00:00";
  matches = 0;
  moves = 0;
  star = 3;
  gameRunning = false;
}
//add the star rating in the scoreboard
//count the moves and add to scoreboard
function updateScore() {
  movesCount.innerText = moves;
  if (moves > 6 && moves < 10) {
    document.querySelector('#stars i:first-child').style.display = 'none';
    star = 2;
  } else if (moves > 20) {
    document.querySelector('#stars i:nth-child(2)').style.display = 'none';
    star = 1;
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}
