// Contains a constructor, Letter. 
// This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), 
//   depending on whether or not the user has guessed the letter. 
// That means the constructor should define:
//   * A string value to store the underlying character for the letter
//   * A boolean value that stores whether that letter has been guessed yet
//   * A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed
//   * A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
function Letter(letter) {
    this.value = letter;
    this.guessed = false;

    // toString() - helper function to return the formatted value of the letter
    //               underlines mask letters that haven't been guessed
    //               spaces are given as "freebies"
    this.toString = function () {
        return ((this.guessed || (this.value === ' ')) ?  this.value : "_");
    };

    this.guessLetter = function (character) {
        if (character.toLowerCase() === this.value.toLowerCase()) {
            this.guessed = true;
        }
    };

    // Test script for Letter
    this.unitTest = function () {
        console.log('Original value: ' + this.value);
        this.guessLetter('b');
        console.log('Test fail condition: ' + this);
        this.guessLetter('a');
        console.log('Test success condition: ' + this);
    };
}
//----------------------------------------
// Uncomment for test script of Letter methods
//----------------------------------------
// var guess = new Letter('a');
// guess.unitTest();
//----------------------------------------
module.exports = Letter;
