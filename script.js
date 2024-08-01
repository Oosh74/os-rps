console.log('hello world');

let getComputerChoice = () => {
  let num = Math.floor(Math.random() * (4 - 1) + 1);
  let choice = '';

  if (num === 1) {
    choice = 'Melee';
  } else if (num === 2) {
    choice = 'Ranged';
  } else {
    choice = 'Magic';
  }

  return (getComputerChoice = choice);
};

getComputerChoice();

let humanChoice = () => {
  let choice = prompt('Melee, Ranged, or Magic?').toLowerCase();

  if (choice === 'melee' || choice === 'ranged' || choice === 'magic') {
    choice = choice[0].toUpperCase() + choice.slice(1);
    return (humanChoice = choice);
  } else {
    alert('Invalid choice, try again');
    humanChoice();
  }
};

humanChoice();
console.log('This is the human choice,', humanChoice);
console.log('This is the computer choice', getComputerChoice);

const playRound = (pChoice, cpuChoice) => {
  let playerScore = 0;
  let cpuScore = 0;

  if (pChoice === 'Melee' && cpuChoice === 'Ranged') {
    console.log('You win! Melee beats Ranged.');
    playerScore++;
  } else if (pChoice === 'Melee' && cpuChoice === 'Magic') {
    console.log('You lose! Magic beats Melee.');
    cpuScore++;
  } else if (pChoice === 'Magic' && cpuChoice === 'Ranged') {
    console.log('You lose! Ranged beats Magic');
    cpuScore++;
  } else if (pChoice === 'Magic' && cpuChoice === 'Melee') {
    console.log('You win! Magic beats melee.');
    playerScore++;
  } else if (pChoice === 'Ranged' && cpuChoice === 'Melee') {
    console.log('You lose! Melee beats ranged.');
    cpuScore++;
  } else if (pChoice === 'Ranged' && cpuChoice === 'Magic') {
    console.log('You win! Ranged beats magic.');
    playerScore++;
  } else {
    console.log("It's a draw!");
  }

  console.log(`Player Score: ${playerScore}`);
  console.log(`Computer Score: ${cpuScore}`);
};

playRound(humanChoice, getComputerChoice);
