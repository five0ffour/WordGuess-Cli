// * Randomly selects a word and uses the `Word` constructor to store it
// * Prompts the user for each guess and keeps track of the user's remaining guessesvar inquirer = require('inquirer');

var inquirer = require('inquirer');

var WordTable = require("./wordtable.js");
var Word = require("./word.js");

var game = {

    //-----------
    // Variables 
    //-----------
    word: new Word(),
    wordTable: new WordTable(),
    maxRounds: 10,
    currentRound: 0,

    //-----------
    // Methods
    //-----------

    resetGame: function () {
        currentRound = 0;
        word = new Word();
        word.setWord(this.wordTable.getRandomWord());
    },

    playGame: function () {
        console.log("\n--------\nplayGame()\n---------");
        this.resetGame();

        if (!this.isGameOver()) {
            this.playRound();
        } else {
            this.endGame();
        }
    },

    promptGuess: function () {
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
            });
    },

    playRound: function () {

        currentRound++;
        console.log("\n----------\nplayRound: ROUND " + currentRound + "\n----------\n");
        this.promptGuess();
        word.getWord();
    },

    isGameOver: function () {
        return (word.getWord() === word.original ||
            currentRound >= this.maxRounds);
    },

    endGame: function () {
        console.log("\n--------endGame()--------\n");

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
                } else {
                    console.log("Come back again soon!");
                }
            });
    }
}

//---------------------
// Main Start of Game - 
//---------------------
game.playGame();