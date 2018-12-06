// * Randomly selects a word and uses the `Word` constructor to store it
// * Prompts the user for each guess and keeps track of the user's remaining guessesvar inquirer = require('inquirer');
var inquirer = require('inquirer');
var WordTable = require("./wordtable.js");
var Word = require("./word.js");
//-------------------
// Global Variables - 
//-------------------
var word = new Word();
var wordTable = new WordTable();
var currentRound = 0;
var maxGuesses = 10;
var guesses = 0;
//-----------
// Methods
//-----------
function resetGame() {
    currentRound = 0;
    word = new Word();
    word.setWord(wordTable.getRandomWord());
}
function playGame() {
    console.log("\n--------\nplayGame()\n---------");
    resetGame();
    playRound();
}
function promptGuess() {
    inquirer
        .prompt([{
            name: "letter",
            type: "input",
            message: "Guess a letter:"
        }])
        .then(function (answer) {
        console.log("Your guess: ", answer.letter);
        word.guessLetter(answer.letter);
        console.log(word.getWord());
        playRound();
    });
}
function playRound() {
    currentRound++;
    if (!isGameOver()) {
        console.log("\n----------\nplayRound: Round " + currentRound + "\n----------\n");
        promptGuess();
    }
    else {
        endGame();
    }
}
function isGameOver() {
    return (word.getWord() === word.original ||
        guesses >= maxGuesses);
}
function endGame() {
    console.log("\n--------Game Over--------\n");
    // Prompts the user if they would like to play again.
    // Otherwise print the "come back again soon message" and exit
    inquirer
        .prompt({
        name: "again",
        type: "confirm",
        message: "Would you like to play another game?"
    })
        .then(function (answer) {
        if (answer.again === true) {
            playGame();
        }
        else {
            console.log("Come back again soon!");
        }
    });
}
//---------------------
// Main Start of Game - 
//---------------------
playGame();
