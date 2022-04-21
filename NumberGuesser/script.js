let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Generate random number between 0-9.
const generateTarget = () => {
  return Math.floor(Math.random() * 10);
};

// Get the absolute distance between the two numbers.
const getAbsoluteDistance = (a, b) => Math.abs(a - b);

// Compare whether the human guess is closer than the computer guess or not.
const compareGuesses = (humanGuess, computerGuess, targetNumber) => {
  if((getAbsoluteDistance(humanGuess, targetNumber)) <= getAbsoluteDistance(computerGuess, targetNumber)) 
  {
    return true;
  }
  else 
  {
    return false;
  };
};

// Update the score value depending on who the winner is.
function updateScore(winner) {
  switch(winner) {
    case 'human':
      humanScore += 1;
      break;
    case 'computer':
      computerScore += 1;
      break;
    default:
      console.log('Error no correct winner value given');
      break;
  }
}

// Increase the current round number by 1.
function advanceRound() {
  currentRoundNumber += 1;
}