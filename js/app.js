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

function generateCards(icon) {
  return `<div class="card col3" data-card=${icon}><i class="fa ${icon}"></i></div>`;
}

function startGame() {
  let deck = shuffle(cardIcon).map(function(cardIcon) {return generateCards(cardIcon)});
  board.innerHTML = deck.join('');
  clickCards();
}

function clickCards() {
  board.addEventListener('click', function(event) {
    let et = event.target;
    if (et.classList.contains('card') && !et.classList.contains('open') && !et.classList.contains('show') && !et.classList.contains('match') && pickedCards.length < 2) {
      pickedCards.push(et);
      et.classList.add('show', 'open');
    }
    compareCards(pickedCards);
    updateScore();
    winYet();
  })
}

//compare cards
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

//if they match, assign match class
//if they don't match, hide them again after some animation and a few seconds
//only allow two cards to be shown at once
//check if all cards have been matched yet
function winYet() {
  if (matches === 8) {
    //stop game, you win.
    //open modal
    alert("you win!");
  }
}
//make all the boxes stay the same size
//add a timer for the game
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
//add modal when the game is won showing the score and star rating

startGame()
//shuffle and place cards on pageload

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
