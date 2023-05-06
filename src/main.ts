/** pseudo code 
 * ✔️ Player should get 2 cards at the beginning
 * ✔️ Player can either hit more cards
 * ✔️ Player can stand
 * Player can double up (if the total sum of player[] is between 9-11)
 * Player can split (if the 2 first cards are the same value)
 * 
 * ✔️ if player gets more than 21, player lose and PlayAgain-button shows. 
 * ✔️ PlayAgain-button should start the game over again
 * 
 * if the first two cards are either an Ace OR 10, J, Q, K you should get BlackJack
 * it doesnt matter if the first card are an Ace or 10, J, Q, K &&& if the second card is an Ace or 10, J, Q, K
 * If player gets BlackJack, all the button = disable and Dealer takes a card.
 * 
 * if player gets blackjack, and dealer has 2-9, player wins.
 * if player gets blackjack, and dealer has 10, J, Q, K, dealer takes one more card.
 * If dealer gets an Ace on the second card, it is push.
 * Otherwise, player wins (if the card is not an Ace).
 * 
 * ✔️ Dealer gets 1 card at the beginning
 * ✔️ When player hits stand, the dealer should take another card
 * ✔️ The dealer takes card until 17 - 21. 
 * ✔️ If 17-21, dealer stand.
 * ✔️ If the total sum of dealer[] is bigger than 21, Dealer lose and Player wins.
 * 
 * ✔️ If total sum of player[] is > than dealer[] AND < 21, player wins.
 * ✔️ If total sum of dealer[] is > than player [] AND < 21, dealer wins.
 * 
 * 
 * 
*/

const app = document.getElementById('app');

type cardValue = {value: string, altValue: number};

const symbols: string[] = ["♥", "♦", "♣", "♠"];
const valueCards: cardValue[] = [
  {value: "A", altValue: 1 | 11},
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


/** BUTTONS **/
const hitBtn = document.createElement('button');
hitBtn.innerHTML = "Hit card";

const standBtn = document.createElement('button');
standBtn.innerHTML = "Stand";

const resetBtn = document.createElement('button');
resetBtn.innerHTML = "Play again";

app?.appendChild(hitBtn);
app?.appendChild(standBtn);
app?.appendChild(resetBtn);

standBtn.addEventListener('click', () => {
  let sum =  player.reduce((total, value) => total + value, 0);
  console.log( "Player are standing on: " + sum); // sum up the total in player array

  hitBtn.disabled = true;
  standBtn.disabled = true;

  dealerTakesCard();

});

hitBtn.addEventListener('click', getCardForPlayer);

resetBtn.addEventListener('click', resetGame);

/** 
FUNCTIONS 
**/

function dealerTakesCard() {
  getCardForDealer();
  sumUpTotalDealer();
}

const dealer: number[] = [];

function getCardForDealer() {
  let cardValue: number;
  let cardForDealer: { value: string } = { value: ''};

  let cardObject = valueCards[Math.floor(Math.random() * valueCards.length)];

  if (typeof cardObject === "object" && "altValue" in cardObject) {
    cardValue = cardObject.altValue;
    cardForDealer.value = cardObject.value;
  } else {
    cardValue = cardObject as number;
  }

  dealer.push(cardValue);

  let symbol = symbols[Math.floor(Math.random() * symbols.length)];
  let dealerCard = document.createElement('p');
  dealerCard.className = 'dealer-card';
  dealerCard.innerHTML = "Dealer: " + cardForDealer.value + " " + symbol;

  app?.appendChild(dealerCard);

}
getCardForDealer();

let dealersum;
let playersum: number;

function sumUpTotalDealer() {
  dealersum =  dealer.reduce((total, value) => total + value, 0);
  if (dealersum >= 17 && dealersum <= 21) { // if sum is bigger or EQUAL 17 AND less OR EQUAL 21, dealer stand.
    console.log('dealer stands on: ' + dealersum);

  } if (dealersum < 17) { // if sum is less than 17 dealer takes another card
    getCardForDealer();
    sumUpTotalDealer();

  } if(dealersum > 21) { // if dealer sum is bigger than 21, dealer lose.
    let dealerTooMuch = document.createElement('p');
    dealerTooMuch.innerHTML = "dealer too much, player wins!"
    app?.appendChild(dealerTooMuch);

  } if (dealersum === playersum) { // if dealer and player has the same sum, its a push
    //console.log('its a push!');
    let pushText = document.createElement('p');
    pushText.innerHTML = "Its a push!";
    app?.appendChild(pushText);

  } if ((dealersum <= 21 && playersum <= 21) && (dealersum > playersum)) { // if dealersum and playersum is equal or less than 21 AND dealer is bigger than player. dealer wins.
    console.log('dealer wins!');
    let dealerWins = document.createElement('p');
    dealerWins.innerHTML = "Dealer wins with : " + dealersum + " | against Player: " + playersum;

    app?.appendChild(dealerWins);

  } if ((playersum <= 21 && dealersum <= 21) && (playersum > dealersum)) { // if playersum and dealersum is equal or less than 21 AND player is bigger than dealer. player wins.
    console.log('player wins!')
    let playerWins = document.createElement('p');
    playerWins.innerHTML = "Player wins with : " + playersum + " | against Dealer: " + dealersum;

    app?.appendChild(playerWins);
  }
}

const player: number[] = [];

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
  let playerCard = document.createElement('p');
  playerCard.className = 'player-card';
  playerCard.innerHTML = "Player: " + cardForPlayer.value + " " + symbol;
  app?.appendChild(playerCard);

  sumUpTotalPlayer();

}

function sumUpTotalPlayer() {
  playersum =  player.reduce((total, value) => total + value, 0);

  // if sum is BIGGER than 21 = too much + disable hitbtn
  if (playersum > 21) {
    // stop the game, disable all buttons and show play again button
    let playAgainText = document.createElement('p');
    playAgainText.innerText = "Too much! Play again?"

    hitBtn.disabled = true;
    standBtn.disabled = true;

    app?.appendChild(playAgainText);
    app?.appendChild(resetBtn);

  // if sum is 21, disable the hit card btn and stand
  } if (playersum === 21) { 
    console.log('21!!!');
    hitBtn.disabled = true;
    standBtn.disabled = true;
    dealerTakesCard();

  // if the 2 first cards is Ace AND 10 | J | Q | K, you get blackjack! 
  } 
}

function resetGame() {
  const cards = document.querySelectorAll('p');
  cards.forEach(card => card.remove()); // Remove all cards from the game

  player.length = 0; // reset player array
  dealer.length = 0; // reset dealer array

  hitBtn.disabled = false;
  standBtn.disabled = false;

  // Generate 1 random card for the dealer at the start of the game when clicking on Play again button
  getCardForDealer();

  // Generate two random cards for the player at the start of the game when clicking on Play again button
  getCardForPlayer();
  getCardForPlayer();
}

  // Generate two random cards for the player at the start of the game
  getCardForPlayer();
  getCardForPlayer();