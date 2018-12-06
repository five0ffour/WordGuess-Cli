// * Randomly selects a word and uses the `Word` constructor to store it
// * Prompts the user for each guess and keeps track of the user's remaining guessesvar inquirer = require('inquirer');
const inquirer = require('inquirer');
const WordTable = require("./wordtable.js");
const Word = require("./word.js");
const Letter = require("./letter.js");

//-------------------
// Global Variables - 
//-------------------
const wordTable = new WordTable();      // the source of our random word
const maxMistakes = 10;                 // number of bad guesses before you hit "HANGMAN!"
let badGuesses = 0;                     // the actual number of mistakes made by the user this game
let word = new Word();                  // the word we'll be trying to find (once it's set)
let currentRound = 0;                   // simple round counter
let guessedLetters = [];                // array of letters, tracks the user's guesses to avoid duplicates

//-----------
// Methods
//-----------

//------------------
// playGame() = starting point for the application
//------------------
function playGame() {
    console.log("\n----------\nStart Game\n----------");
    resetGame();
    playRound();
}

//------------------
// resetGame() - set the game back to its startup state
//------------------
function resetGame() {
    currentRound = 0;
    badGuesses = 0;
    word = new Word();
    word.setWord(wordTable.getRandomWord());
    guessedLetters = [];
}

//------------------
// promptGuess() - prompts the user for a letter using inquirer and validates/adjudicates the result
//------------------
function promptGuess() {
    inquirer
        .prompt([{
            name: "letter",
            type: "input",
            message: "Guess a letter:"
        }])
        .then(function (answer) {

            console.log("Your guess: ", answer.letter);

            validateGuess(answer.letter);
            playRound();
        });
}

//------------------
// validateGuess() - ensure we don't have duplicate guesses, tracks the number of invalid guesses
//------------------
function validateGuess(userGuess) {

    // Check if it's already been guessed    
    let match = guessedLetters.find(letter => letter === userGuess.toLowerCase());
    if (match) {
        // letter already guessed
        console.log("Whoops!  You already guessed that one.  I'll ignore it though\n");
    } else {
        // unique guess,  save it as a valid guess
        guessedLetters.push(userGuess.toLowerCase());

        // determine if this is a correct guess and write out the results
        word.guessLetter(userGuess.toLowerCase());
    }
    console.log(word.getWord());
}


//------------------
// playRound() - prompts the user for a guess and determines if we've reached the end of the game
//------------------
function playRound() {
    currentRound++;
    if (!isGameOver()) {
        console.log("\n----------\n  Round " + currentRound + "\n----------\n");
        promptGuess();
    } else {
        endGame();
    }
}

//-------------------
// isGameOver() - dose the logic of seeing if they won, ending the game or make too many incorrect guesses
//-------------------
function isGameOver() {
    return (word.getWord() === word.original ||
        badGuesses >= maxMistakes);
}

//-------------------
// endGame() - prompt the final result and prompt the user if they want to start over with a new game
//-------------------
function endGame() {
    console.log("\n-------- Game Over --------\n");

    inquirer
        .prompt({
            name: "again",
            type: "confirm",
            message: "Would you like to play another game?"
        })
        .then(function (answer) {
            if (answer.again === true) {
                playGame();
            } else {
                console.log("Come back again soon!");
            }
        });
}

//---------------------
// Main Start of Game - 
//---------------------
playGame();