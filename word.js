// Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

// * An array of `new` Letter objects representing the letters of the underlying word

// * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

// * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)

var Letter = require('./letter.js');

function Word() {

    this.original = "";
    this.word = [];

    // setWord() - Save the string as our word, convering it to an array of 'Letters'
    this.setWord = (newWord) => {
        this.original = newWord; // save the original
        this.word = []; // empties the last array of Letters we stored

        // create a new array of 'Letters' based on the passed string
        for (let i = 0; (i < newWord.length); i++) {
            this.word.push(new Letter(newWord[i]));
        }
    }

    // getWord() - return the word showing only the guessed characters
    this.getWord = () => {
        var word = "";
        for (let i=0; (i < this.word.length); i++ ) {
            word += " " + this.word[i] + " ";
        }
        return word;
    }

    // guessLetter(guess) - determine/store if guess is valid for each character
    this.guessLetter = (guess) => {
        for (let i=0; (i < this.word.length); i++) { 
             this.word[i].guessLetter(guess); 
        }
    }

    // matchedWord() - did they guess the entire word?  true or false
    this.matchedWholeWord = () => {

        debugger;
        let found = true;
        for (let i=0; (i < this.word.length); i++ ) {
            if (this.word[i].toString() === "_") {
               found = false;
               break;
            }
        }
        return found;
    }

    // unitTest() - simple test script to validate methods
    this.unitTest = () => {
        console.log("--------------------------");
        console.log("Original word:", this.original);

        console.log("Guessing 'e' ");
        this.guessLetter('e');

        console.log("Guessing 'S' ");
        this.guessLetter('S');

        console.log("Guessing 'n' ");
        this.guessLetter('n');

        console.log("Guessing 'o' ");
        this.guessLetter('o');

        console.log("Result: ");
        console.log(this.getWord());
        console.log("--------------------------");
    }

}

//----------------------------------------
// Uncomment for test script of Word methods
//----------------------------------------
// var word = new Word();
// word.setWord("Smilodon");
// word.unitTest();
//----------------------------------------

module.exports = Word;

