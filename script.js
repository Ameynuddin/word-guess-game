// Initialize list of words with hints
const wordList = [
    { word: "guitar", hint: "A string musical instrument" },
    { word: "eagle", hint: "A large bird of prey" },
    { word: "puzzle", hint: "A game or problem that tests ingenuity" },
    { word: "atlas", hint: "A collection of maps" },
    { word: "jaguar", hint: "A large, spotted wild cat" },
    { word: "harvest", hint: "The process of gathering crops" },
    { word: "orbit", hint: "The path of a celestial object" },
    { word: "laser", hint: "A device that emits light through optical amplification" },
    { word: "nebula", hint: "A cloud of gas and dust in space" },
    { word: "python", hint: "A type of large snake" }
];

// Select elements from the HTML document
const inputs = document.querySelector(".letters"); // Container for input boxes containing the word
const hint = document.querySelector(".hint span"); // Span to display the hint
const guessLeft = document.querySelector(".guess-left span"); // Span to display remaining guesses
const wrongLetter = document.querySelector(".wrong-letters span"); // Span to display wrong letters

const typingInput = document.querySelector(".type-input"); // Input field for typing guesses


// Game variables
let word, maxGuesses, corrects, incorrects;

// Function to initialize the game with a random word
function initializeGame() {
    // Select a random word
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomWord.word; // Get the word from the selected object
    maxGuesses = 3; // Set the maximum number of guesses
    corrects = []; // Initialize the correct guesses array
    incorrects = []; // Initialize the incorrect guesses array

    // Display the hint text
    hint.innerText = randomWord.hint;
    // Initialize the remaining guesses
    guessLeft.innerText = maxGuesses;
    // Initialize the wrong letters to null
    wrongLetter.innerText = "";

    // Create input boxes for each letter, not editable by user
    inputs.innerHTML = word.split("").map(() => `<input type="text" disabled>`).join("");
}

// Function to handle user input and update the game state
function handleUserInput(event) {
    const key = event.target.value.toLowerCase(); // Get the entered key and convert to lowercase
    // Check if the entered key is a valid alphabet letter and not already guessed
    if (key.match(/^[a-z]$/) && !incorrects.includes(key) && !corrects.includes(key)) {
        if (word.includes(key)) {
            // If the key is in the word, reveal it in the input boxes
            word.split("").forEach((letter, index) => {
                if (letter === key) {
                    corrects.push(key); // Add to correct guesses
                    inputs.querySelectorAll("input")[index].value = key; // Update the input box
                }
            });
        } else {
            // If the key is not in the word, decrement remaining guesses and add to wrong letters
            maxGuesses--;
            incorrects.push(key); // Add to incorrect guesses
        }
        updateGameStatus(); // Update the game status (remaining guesses and wrong letters)
    }
    typingInput.value = ""; // Clear the input field
}

// Function to update the game status display
function updateGameStatus() {
    guessLeft.innerText = maxGuesses; // Update remaining guesses in the UI
    wrongLetter.innerText = incorrects.join(" "); // Update wrong letters in the UI

    setTimeout(() => {
        if (corrects.length === word.length) {
            // If all letters are guessed correctly, display a success message and reset the game
            alert(`Congrats! You found the word: ${word.toUpperCase()}`);
            initializeGame(); // Restart the game with a new word
        } else if (maxGuesses < 1) {
            // If no guesses remain, display a game over message and reveal the word
            alert(`Game over! The word was: ${word.toUpperCase()}`);
            // Reveal the word by filling in all input boxes
            inputs.querySelectorAll("input").forEach((input, index) => {
                input.value = word[index];
            });
        }
    }, 100); // Delay to allow the last key to be processed
}


// Event listener for typing input to handle user guesses
typingInput.addEventListener("input", handleUserInput);

// Event listener to focus the input field when input boxes are clicked
inputs.addEventListener("click", () => typingInput.focus());

// Event listener to focus the input field when any key is pressed
document.addEventListener("keydown", () => typingInput.focus());


// Call the function to initialize the game
initializeGame();
