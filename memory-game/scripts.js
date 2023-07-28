const cards = document.querySelectorAll('.memory-card'); 

let hasFlippedCard = false; 
let lockBoard = false; 
let firstCard, secondCard;

function flipCard(){
    if(lockBoard) return; 
    if (this === firstCard) return;


    this.classList.toggle('flip'); 

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this; 
        return; 
    }
    // second click
    // hasFlippedCard = false;
    secondCard = this;

    checkForMatch()
    
}


function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards();

    // // do cards match? 
    // if (firstCard.dataset.framework === secondCard.dataset.framework){
    //     // it's a match!
    //     disableCards() 
    // } else{
    //     //not a match 
    //     unFlipCards() 
    // }
}


function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard); 

    resetBoard()
}

function unFlipCards(){
    lockBoard=true 

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard() 
    }, 250)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


(function suffle(){
    cards.forEach(card=>{
        let randomPos = Math.floor(Math.random()*12) 
        card.style.order = randomPos 
    })
})() 


cards.forEach(card => card.addEventListener('click', flipCard));