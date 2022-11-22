// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// get Array of letters

let lettersArray = Array.from(letters);

// Select Letters Container

let lettersContainer = document.querySelector(".letters");

// Generate Letters

lettersArray.forEach((letter) => {
  // Create span
  let span = document.createElement("span");

  // Create the text node

  let theLetter = document.createTextNode(letter);

  // Append text node to span

  span.appendChild(theLetter);

  // add class to span

  span.className = "letter-box";

  // Append span to letters container
  lettersContainer.appendChild(span);
});

// Object of Words + Categories

const words = {
  animals: ["cat", "dog", "elephant", "lion", "tiger", "monkey", "horse"],
  countries: ["egypt", "algeria", "morocco", "tunisia", "libya"],
  cities: ["cairo", "alexandria", "tanta", "mansoura", "aswan"],
  fruits: ["banana", "orange", "apple", "lemon", "watermelon", "mango"],
};

//Get random Property

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValue = randomPropValue[randomValueNumber];

//set Category Title

document.querySelector(".game-info .category span").innerHTML = randomPropName;

//Select letters guess element

let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert random word to array

let lettersAndSpace = Array.from(randomValue);

// Create Spans for each letter

lettersAndSpace.forEach((letter) => {
  let span = document.createElement("span");

  // If Letter Is Space
  if (letter === " ") {
    // Add Class To The Span
    emptySpan.className = "with-space";
  }

  lettersGuessContainer.appendChild(span);
});
// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts
let wrongAttempts = 0;
// select the draw element
let theDraw = document.querySelector(".hangman-draw");

// Handle Click on letter
document.addEventListener("click", (e) => {
  // Set status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // Get the clicked letter
    let clickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(randomValue.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (clickedLetter === wordLetter) {
        // Set status to true
        theStatus = true;
        // Loop on All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
      }
    });

    // if letter not exist in word
    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
    }
  }
});

function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValue}`
  );
  div.appendChild(divText);
  div.className = "pop-up";
  document.body.appendChild(div);
}

// win game popup
function winGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Congrats, You Win`);
  div.appendChild(divText);
  div.className = "pop-up-win";
  document.body.appendChild(div);
}

// if all letters are guessed
let theInterval = setInterval(() => {
  let tempText = "";
  guessSpans.forEach((span) => {
    tempText += span.innerHTML;
  });
  if (tempText === randomValue) {
    winGame();
    clearInterval(theInterval);
  }
}, 100);
// reload when the game is over
document.addEventListener("click", (e) => {
  if (e.target.className === "pop-up" || e.target.className === "pop-up-win") {
    window.location.reload();
  }
});
