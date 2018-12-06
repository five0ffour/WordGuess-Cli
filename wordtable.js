//--------
// WordTable - List of words as game options,  our theme is American Megafuana -  Extinct or not
//--------
function WordTable () {

    //----------------
    // Word Options  - 
    //----------------

    // words[] - array of strings representing various megafauna 
    this.words = [

        // Pleistocene Megafauna
        'Moa',
        'Woolly Rhino',
        'Irish Elk',
        'Gigantopithecus', 
        'Cave Bear',
        'Dire Wolf',
        'Giant Ground Sloth',
        'Sabre Toothed Tiger',
        'Woolly Mammoth',
        'Megalodon',
        'Giant Otter',
        'Giant Beaver',
        'Diprotodon',
        'Megalodon',

        // Modern  Megafauna
        'Hippopotamus',
        'American Bison',
        'American Lion',
        'Dire Wolf',
        'Komodo Dragon',
        'Asian Elephant',
        'Saltwater Crocodile',
        'Water Buffalo',
        'Musk Ox',
        'Bengal Tiger',
        'Bactrian Camel',
        'Green Anaconda',
        'Sperm Whale',
        'Eastern Gorilla',
        'Nile Perch',
        'Giant Squid',
        'Southern Cassowary',
        'Sumatran Orangutan',
        'Blue Whale',
        'Mountain Gorilla',
        'Red Kangaroo',
        'Auroch',
        'Coelacanth',
        'Okapi',
        'Octopus'
    ];

    //---------
    // Methods
    //---------

    //---
    // getRandomWord() - returns a randomly selected word from the table and returns as a string
    //---
    this.getRandomWord = () => {
      return this.words[Math.floor(Math.random() * this.words.length)];         
    }

    //---
    // unitTest() - simple test function to test the WordTable functions
    //---
    this.unitTest = () => {
        var word = this.getRandomWord();
        console.log("wordTable: - The randomly selected word is: \"" + word + "\"");     
    }
};

//------------------------------------------------
// Uncomment to execute unit test of the table
//------------------------------------------------
// var table = new WordTable();
// table.unitTest();
//------------------------------------------------

//----------
// Exports
//----------
module.exports = WordTable;
