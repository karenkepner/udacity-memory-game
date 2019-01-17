//16 pairs of cards to match
let cards = [
  'fa-coffee', 'fa-coffee', 'fa-dog', 'fa-dog', 'fa-crow', 'fa-crow', 'fa-dragon', 'fa-dragon', 'fa-fire', 'fa-fire', 'fa-hippo', 'fa-hippo', 'fa-democrat', 'fa-democrat', 'fa-snowflake', 'fa-snowflake'
]
let board = document.getElementById('game-board')


function generateCards(card) {
  return `<div class="card col3"><i class="fa ${card}"></i></div>`;
}

function startGame() {
  let deck = shuffle(cards).map(function(cards) {return generateCards(cards)});
  board.innerHTML = deck.join('');
}

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
