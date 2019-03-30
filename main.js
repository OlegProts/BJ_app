
const suits = ['H', 'S', 'C', 'D'];
const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
var deck = [], 
    playerCards = [],
    dealerCards = [],
    totalScorePlayer1 = 0,
    totalScoreDealer = 0,
    pl1StartCardsNum = 2,
    dealerCardsNum = 2,
    randNum, 
    li,
    img,
    dealWins = 0,
    pl1Wins = 0;

var startBtn = document.getElementById('startBtn');
var dealBtn = document.getElementById('dealBtn');
var hitBtn = document.getElementById('hitBtn');
var standBtn = document.getElementById('standBtn');

var deckTotal = document.getElementById('deckTotalSummary');
var pl1Cards = document.getElementById('playerCards');
var deal1Cards = document.getElementById('dealerCards');
var plSum = document.getElementById('playerScoreTotal');
var dlSum = document.getElementById('dealerScoreTotal');
var mess = document.getElementById('message');
// bank account
var betRange = document.getElementById('betRange');
var betAmount = document.getElementById('betAmount');
var balance = document.getElementById('balance');
var betBtn = document.getElementById('betBtn');
var bankAmount = document.getElementById('bankAmount');
var dealerVins = document.getElementById('dealerVins');
var playerVins = document.getElementById('playerVins');

startBtn.addEventListener('click', start);
dealBtn.addEventListener('click', dealCards);
hitBtn.addEventListener('click', hit);
standBtn.addEventListener('click', stand);
betRange.addEventListener('input', () => betAmount.innerHTML = betRange.value);
betBtn.addEventListener('click', bet);

function bet () {
    bankAmount.innerHTML = betAmount.textContent;
    balance.innerHTML = balance.textContent - betAmount.textContent;
    betRange.max = balance.textContent;
    betBtn.disabled = "disable";
} 
function clearHands (){
    // player
    playerCards = [];
    pl1Cards.children[0].innerHTML = '';
    pl1StartCardsNum = 2;
    // dealer
    dealerCards = [];
    deal1Cards.children[0].innerHTML = '';
    dealerCardsNum = 2;
}
// function clearPlayerHand (){
//     playerCards = [];
//     pl1Cards.children[0].innerHTML = '';
//     pl1StartCardsNum = 2;
// }
// function clearDealerHand (){
//     dealerCards = [];
//     deal1Cards.children[0].innerHTML = '';
//     dealerCardsNum = 2;
// }

function dealerIsVinner (){
    dealWins ++;
    dealerVins.innerHTML = dealWins;
    bankAmount.textContent = 0;
    betBtn.disabled = "";
    // clearHands();
    showMessage('DEALER WON! Please, put your next BET');
}
function playerIsVinner (){
    pl1Wins ++;
    playerVins.innerHTML = pl1Wins;
    var newBalance = parseInt(balance.textContent)+parseInt(bankAmount.textContent)*2;
    balance.innerHTML = newBalance;
    bankAmount.textContent = 0;
    betBtn.disabled = "";
    // clearHands();    
    showMessage('YOU WON! Please, put your next BET');
}
function split (){
    var newBalance = parseInt(balance.textContent)+parseInt(bankAmount.textContent);
    balance.innerHTML = newBalance;
    bankAmount.textContent = 0;
    betBtn.disabled = "";
    // clearHands();
    showMessage('SPLIT! Please, put your next BET');
}

function start (){
    startBtn.className = 'hide';    
    dealBtn.className = '';    
    hitBtn.className = '';    
    standBtn.className = '';    
    createNewDeck();
    shuffle();
    dealCards();
    deckTotal.innerText = deck.length;
    return deck;
}
function createNewDeck (){
    for (let i = 0; i<values.length; i++) {
        for (let j = 0; j<suits.length; j++) {
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = { Value: values[i], Suit: suits[j], Weight: weight };
            deck.push(card);
        }
    }
}
function showMessage (message){
    mess.className = '';
    mess.innerText = message;
}
function newDeal (){
    dealBtn.className = '';
    hitBtn.className = 'hide';
    standBtn.className = 'hide';
}
function shuffle (){
    for (var i=deck.length-1; i>0; i--){
        var randomIndex = Math.floor(Math.random() * (i+1));
        var temp = deck[i];
        deck[i] = deck[randomIndex];
        deck[randomIndex] = temp;
    }
}

function dealCards (){
    if(bankAmount.textContent == 0){
        showMessage('Put your next BET');
    } else{
    dealBtn.className = 'hide';
    hitBtn.className = '';
    standBtn.className = ''; 
    clearHands();

    // 1-st card to player and open
    playerCards.push(deck[deck.length-1]);
    li = document.createElement('li');   
    li.innerHTML = '<img src="imgs/cards/'+playerCards[0].Value+playerCards[0].Suit+'.png">';
    pl1Cards.children[0].appendChild(li);
    deck.splice(-1,1);
    deckTotal.innerText = deck.length;

    // 1-st dealer card and HIDE  
    dealerCards.push(deck[deck.length-1]);
    li = document.createElement('li');   
    li.innerHTML = '<img src="imgs/cards/backs/purple_back_mid.png">';
    deal1Cards.children[0].appendChild(li);
    deck.splice(-1,1);
    deckTotal.innerText = deck.length;
    
    // 2-nd player card and open   
    playerCards.push(deck[deck.length-1]);
    totalScorePlayer1 = playerCards[0].Weight + playerCards[1].Weight;
    plSum.innerText = totalScorePlayer1;
    li = document.createElement('li');
    li.innerHTML = '<img src="imgs/cards/'+playerCards[1].Value+playerCards[1].Suit+'.png">';
    pl1Cards.children[0].appendChild(li);
    deck.splice(-1,1);
    deckTotal.innerText = deck.length;

    // 2-nd dealer card and open   
    dealerCards.push(deck[deck.length-1]);
    totalScoreDealer = dealerCards[1].Weight;
    dlSum.innerText = totalScoreDealer;
    li = document.createElement('li');   
    li.innerHTML = '<img src="imgs/cards/'+dealerCards[1].Value +dealerCards[1].Suit+'.png">';
    deal1Cards.children[0].appendChild(li);
    deck.splice(-1,1);
    deckTotal.innerText = deck.length;

    if(totalScorePlayer1==21) {
        playerIsVinner();
        newDeal ();
        pl1Wins ++; 
    } else {
        showMessage('Push HIT or STAND');
    }
    }
}
function hit (){

    playerCards.push(deck[deck.length-1]);
    totalScorePlayer1 += playerCards[pl1StartCardsNum].Weight;
    plSum.innerText = totalScorePlayer1;
    
    li = document.createElement('li');   
    li.innerHTML = '<img src="imgs/cards/'+playerCards[pl1StartCardsNum].Value+playerCards[pl1StartCardsNum].Suit+'.png">';
    pl1Cards.children[0].appendChild(li);
    deck.splice(-1,1);
    deckTotal.innerText = deck.length;
    pl1StartCardsNum++;
    if (totalScorePlayer1 > 21){
        dealerIsVinner ();
        newDeal();
    } else if (totalScorePlayer1 == 21){
        playerIsVinner();
        newDeal();
    } else {
        showMessage('Push HIT or STAND');
    }    
    
}
function stand (){
    mess.className = 'hide';

    deal1Cards.children[0].firstChild.innerHTML = '<img src="imgs/cards/'+dealerCards[0].Value +dealerCards[0].Suit+'.png">';
    totalScoreDealer += dealerCards[0].Weight;
    dlSum.innerText = totalScoreDealer;
while (totalScoreDealer<17){
    if (totalScoreDealer == 21){
        dealerIsVinner ();
        newDeal();
    } else if (totalScoreDealer > 21){
        playerIsVinner();
        newDeal();
    } else {
        dealerCards.push(deck[deck.length-1]);
        totalScoreDealer += dealerCards[dealerCardsNum].Weight;
        dlSum.innerText = totalScoreDealer;
        li = document.createElement('li');   
        li.innerHTML = '<img src="imgs/cards/'+dealerCards[dealerCardsNum].Value +dealerCards[dealerCardsNum].Suit+'.png">';
        deal1Cards.children[0].appendChild(li);
        deck.splice(-1,1);
        deckTotal.innerText = deck.length;
        dealerCardsNum++;
    }
}
    if (totalScoreDealer > 21){
        playerIsVinner();
        newDeal();
    } else if (totalScoreDealer > totalScorePlayer1) {
        dealerIsVinner ();
        newDeal();
    }else if (totalScoreDealer < totalScorePlayer1){
        playerIsVinner();
        newDeal();
    } else {
        split();
        newDeal();
    }
}    