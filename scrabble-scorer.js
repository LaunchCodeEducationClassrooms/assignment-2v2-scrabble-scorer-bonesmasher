// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {

	word = word.toUpperCase();

	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let word = "";

function initialPrompt() {

  word = input.question("Let's play some scrabble! Enter a word: ");

};

let simpleScore = function(word)
{
  let simplePoints = 0;

  for (letter = 0; letter < word.length; letter++)
  {
    simplePoints += 1;
  }

  return simplePoints;

};

let vowelBonusScore = function(word)
{
  word = word.toUpperCase();

  let wordArray = word.split('');

  let vowels = ["A", "E", "I", "O", "U"];

  let bonusPoints = 0;

  for (letter = 0; letter < wordArray.length; letter++)
  {
    for (vowel = 0; vowel < vowels.length; vowel++)
    {
      if (wordArray[letter].includes(vowels[vowel]))
      {
        bonusPoints += 3;
      }
    }
  }
  return ((word.length - (bonusPoints / 3)) * 1) + bonusPoints;
};

let scrabbleScore = function(word)
{
  return newPointStructure(word);
};

let simpleScoring = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scorerFunction: simpleScore
}

let vowelBonusScoring = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scorerFunction: vowelBonusScore
}

let oldScoring = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scorerFunction: scrabbleScore
}

let scoringAlgorithms = [simpleScoring, vowelBonusScoring, oldScoring];

let scoreType;

function scorerPrompt() {
  scoreType = input.question(`\n0: Simple Score - ${simpleScoring['description']}\n1: Vowel Bonus Score - ${vowelBonusScoring['description']}\n2: Scrabble - ${oldScoring['description']}\n\nSelect a scoring option from the list above: `);
  scoringAlgorithms[scoreType].scorerFunction(word);
  return scoringAlgorithms[scoreType];
}

function transform(obj, letter) {
  for (keyObj in obj)
  {
    if (obj[keyObj].includes(letter))
    {
      return {
        letter: letter.toLowerCase(),
        points: Number(keyObj)
      };
    }
  }
}

let newPointStructure = function(word) {
  let newPoints = 0;
  let wordArr = word.split('');
  for(letter = 0; letter < wordArr.length; letter++)
  {
    wordArr[letter] = wordArr[letter].toUpperCase();
    newPoints += ((transform(oldPointStructure, wordArr[letter])["points"]));
  }
  return newPoints;
};
  //'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10

function runProgram() {
   initialPrompt();
   scorerPrompt();
   console.log(`\nScore for '${word}': ${scoringAlgorithms[scoreType].scorerFunction(word)}!`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

