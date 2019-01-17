//16 pairs of cards to match
let cards = [
  fa-coffee, fa-coffee, fa-carrot, fa-carrot, fa-crow, fa-crow, fa-dragon, fa-dragon, fa-fire, fa-fire, fa-hippo, fa-hippo, fa-democrat, fa-democrat, fa-snowflake, fa-snowflake
]


function generateCards(card) {
  return `<div class="card"><i class="fas ${card}"></i></div>`;
}

//shuffle and place cards on pageload


