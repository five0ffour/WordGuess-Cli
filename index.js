// * Randomly selects a word and uses the `Word` constructor to store it
// * Prompts the user for each guess and keeps track of the user's remaining guessesvar inquirer = require('inquirer');

var inquirer = require('inquirer');

var WordTable = require("./wordtable.js");
var Word = require("./word.js");

function Game() {

    //-----------
    // Variables 
    //-----------
    this.word = new Word();
    this.wordTable = new WordTable();
    this.maxRounds = 10;
    this.currentRound = 0;

    //-----------
    // Methods
    //-----------

    this.resetGame = () => {
        this.roundNumber = 0;
        this.currentRound = 0;
        this.word = new Word();
        this.word.setWord(this.wordTable.getRandomWord());
    }

    this.playGame = () => {
        console.log("\n--------\nplayGame()\n---------");
        game.resetGame();

        if (!this.gameOver) {
            this.playRound();
        } else {
            this.endGame();
        }
    }

    this.playRound = () => {

        this.currentRound++;
        console.log("\n----------\nplayRound: ROUND " + this.currentRound + "\n----------\n");
        this.promptGuess();
        this.word.getWord();
    }

    this.isGameOver = () => {
        return (this.word.getWord() === this.word.original ||
                this.currentRound >= this.maxRounds);

    }

    this.endGame = () => {
        // Prints the final score
        console.log("\n--------endGame()--------\n");

        // Prompts the user if they would like to play again. if yes, run playgame with a value of 0 being passed into it
        // Otherwise print the "come back again soon message" and exit
        inquirer
            .prompt({
                name: "again",
                type: "confirm",
                message: "Would you like to play another game?"
            })
            .then(function (answer) {
                if (answer.again === true) {
                    this.playGame();
                } else {
                    console.log("Come back again soon!");
                }
            });
    }

    this.promptGuess = () => {
        inquirer
            .prompt([{
                name: "letter",
                type: "input",
                message: "Guess a letter:"
            }])
            .then(function (answer) {
                console.log("Your guess: ", answer.letter);

//                game.word.guessLetter(answer.letter);
            });
    }
}

//---------------------
// Main Start of Game - 
//---------------------
var game = new Game();
game.playGame();
