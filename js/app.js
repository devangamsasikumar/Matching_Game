//creation of array to hold all the cards.
var x = [];
console.log(x);
var allCards = [].slice.call(document.querySelectorAll('.card'));
console.log(allCards);
allCards.map(a => {
  a.addEventListener('click', fname); //addition of event listener
});

//function defination of fname that is called from eventlistener
//this enables the user for interactiveness of the project
function fname() {
  if (!this.classList.contains('open') && x.length < 2) {
    this.classList.add("open", "show", "disabled");
    x.push(this);
    matchCards();
  }
  console.log(x[0].firstElementChild.className);
}

// Matching the cards  by using the function matchCards
var counter = 0;

function matchCards() {
  setTimeout(function() { // wait some time
    moveCounter();
    if (x.length == 2) {
      if (x[0].firstElementChild.className === x[1].firstElementChild.className) {
        x.forEach(i => {
          i.classList.add("match");
          i.classList.remove("open", "show");
          counter++;
        });
        gameOver(); //calling the gameover function
      } else {
        x.forEach(i => {
          i.classList.remove("open", "show", "disabled");
        });
      }
      x = [];
    }
  }, 500);
}

// Move Counter
var move = document.querySelector('.moves');
var allStars = [].slice.call(document.querySelectorAll('.fa-star'));

function moveCounter() {
  var moves = move.innerHTML;
  moves++;
  move.innerHTML = moves;
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer(); //calling the timer
  }
  if (moves == 20) {
    allStars[2].classList.add("fa-star-o");
    allStars[2].classList.remove("fa-star");
  }
  if (moves == 40) {
    allStars[1].classList.add("fa-star-o");
    allStars[1].classList.remove("fa-star");
  }

}

//  reload Button
var reload = document.querySelector('.restart');
reload.addEventListener('click', restart);

//reloading the game by clicking the reload button
function restart() {
  location.reload();
}

var second = 0,
  minute = 0,
  hour = 0;
var timer = document.querySelector(".timer");
var interval;
//defing the timer function
function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

// defing the game Over
function gameOver() {
  if (counter == 16) {
    var star = document.querySelectorAll('.fa-star').length;
    clearInterval(interval);
    var starCount = "";
    while (star-- > 0) {
      starCount += '<i class="fa fa-star">';
    }
    //displaying the pop up menu using the sweet alert
    swal({
      title: "Congratulations..!",
      html: "<b>You Won the Game</b> <br> moves: &nbsp <b>" + move.innerHTML + "</b><br>" + "Time: &nbsp <b>" + timer.innerHTML + "</b><br> Stars : <b>" + starCount + "</b>",
      confirmButtonText: "Play Again",
    }).then(() => {
      restart();
    });
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var deck = document.querySelector('.deck');
shuffleCards = shuffle(allCards);
shuffleCards.map(i => {
  [].forEach.call(shuffleCards, function(list) {
    deck.appendChild(list);
  });
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
