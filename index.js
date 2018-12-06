// index.js - the game logic for the word search game.   
//
// * Randomly selects a word and uses the `Word` constructor to store it
// * Prompts the user for each guess and keeps track of the user's remaining guesses
const inquirer = require('inquirer');
const WordTable = require("./wordtable.js");
const Word = require("./word.js");
const Letter = require("./letter.js");

//-------------------
// Global Variables - 
//-------------------
const wordTable = new WordTable();      // the source of our random word
const maxMistakes = 5;                  // number of bad guesses before you hit "HANGMAN!"
let badGuesses = 0;                     // the actual number of mistakes made by the user this game
let word = new Word();                  // the word we'll be trying to find (once it's set)
let currentRound = 0;                   // simple round counter
let uniqueGuesses = [];                 // array of letters, tracks the user's guesses to avoid duplicates
let won = false;                        // did they win this round?

//-----------
// Methods
//-----------

//------------------
// playGame() = starting point for the application
//------------------
function playGame() {
    resetGame();

    console.log("\n----------\nStart Game\n----------");
    console.log("I'm looking for an animal (extinct or not): [ " + word.getWord() + " ]");
    console.log("You can only make up to " + maxMistakes + " mistakes!\n");
    console.log("Let's Go!!");

    playRound();
}

//------------------
// resetGame() - set the game back to its startup state
//------------------
function resetGame() {
    won = false;
    currentRound = 0;
    badGuesses = 0;
    word = new Word();
    word.setWord(wordTable.getRandomWord());
    uniqueGuesses = [];
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

//------------------
// validateGuess() - ensure we don't have duplicate guesses, tracks the number of invalid guesses
//------------------
function validateGuess(userGuess) {

    // Check if it's already been guessed    
    let guess = userGuess.toLowerCase()
    let match = uniqueGuesses.find(letter => letter === guess);
    if (match) {
        // letter already guessed
        console.log("Whoops!  You already guessed that one.  I'll ignore it though\n");
    } else {
        // unique guess,  save it as a valid guess
        uniqueGuesses.push(guess);


        if (!word.goodGuess(userGuess)) {
            badGuesses++;
            console.log("Oops!  Nice try!  You have " + (maxMistakes-badGuesses) + " mulligans left!\n");
        }

        // determine if this is a correct guess and write out the results
        word.guessLetter(guess);
    }
    console.log(word.getWord());
}

//-------------------
// isGameOver() - dose the logic of seeing if they won, ending the game or make too many incorrect guesses
//-------------------
function isGameOver() {

    let over = false;
    if (word.matchedWholeWord()) {
        won = true;   // global flag
        over = true;
    } else if (badGuesses >= maxMistakes) {
        over = true;
    }

    return over;
}

//-------------------
// endGame() - prompt the final result and prompt the user if they want to start over with a new game
//-------------------
function endGame() {
    console.log("\n-------- Game Over --------\n");
    if (won) {
        console.log("Nice job!!!  You've won the round!\n");
    } else {
        console.log("Hoo-rah, not quite!  Better luck next time!");
        console.log("I was looking for [ " + word.original + " ]\n");
    }

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
                console.log("\nCome back again soon!");
            }
        });
}

//---------------------
// Main Start of Game - 
//---------------------
playGame();