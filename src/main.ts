const app = document.getElementById('app');

type cardValue = {value: string, altValue: number};

const symbols: string[] = ["♥", "♦", "♣", "♠"];
const valueCards: cardValue[] = [
  {value: "A", altValue: 11},
  {value: "J", altValue: 10},
  {value: "Q", altValue: 10},
  {value: "K", altValue: 10},
  {value: "2", altValue: 2},
  {value: "3", altValue: 3},
  {value: "4", altValue: 4},
  {value: "5", altValue: 5},
  {value: "6", altValue: 6},
  {value: "7", altValue: 7},
  {value: "8", altValue: 8},
  {value: "9", altValue: 9},
  {value: "10", altValue: 10},
];

const player: number[] = [];

/** BUTTONS **/
const hitBtn = document.createElement('button');
hitBtn.innerHTML = "Hit card";
app?.appendChild(hitBtn);

hitBtn.addEventListener('click', getCardForPlayer);

/*
* 
FUNCTIONS 
*
*/

function getCardForPlayer() {
  let cardValue: number;
  let cardForPlayer: { value: string } = { value: ''};

  let cardObject = valueCards[Math.floor(Math.random() * valueCards.length)];

  if (typeof cardObject === "object" && "altValue" in cardObject) {
    cardValue = cardObject.altValue;
    cardForPlayer.value = cardObject.value;
  } else {
    cardValue = cardObject as number;
  }

  player.push(cardValue);

  let symbol = symbols[Math.floor(Math.random() * symbols.length)];
  let card = document.createElement('p');
  card.innerHTML = "Player: " + cardForPlayer.value + " " + symbol;
  app?.appendChild(card);

  console.log(player)
}