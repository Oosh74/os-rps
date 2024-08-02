const playGame = () => {
  const getComputerChoice = () => {
    let num = Math.floor(Math.random() * (4 - 1) + 1);

    if (num === 1) {
      return 'Melee';
    } else if (num === 2) {
      return 'Ranged';
    } else {
      return 'Magic';
    }
  };

  const getHumanChoice = () => {
    let choice = prompt('Melee, Ranged, or Magic?').toLowerCase();

    if (choice === 'melee' || choice === 'ranged' || choice === 'magic') {
      choice = choice[0].toUpperCase() + choice.slice(1);
      return choice;
    } else {
      alert('Invalid choice, try again');
      return getHumanChoice();
    }
  };

  const determineWinner = (human, cpu) => {
    if (human === 'Melee' && cpu === 'Ranged') {
      console.log('You win! Melee beats Ranged.');
      return 'Player';
    } else if (human === 'Melee' && cpu === 'Magic') {
      console.log('You lose! Magic beats Melee.');
      return 'Cpu';
    } else if (human === 'Magic' && cpu === 'Ranged') {
      console.log('You lose! Ranged beats Magic');
      return 'Cpu';
    } else if (human === 'Magic' && cpu === 'Melee') {
      console.log('You win! Magic beats melee.');
      return 'Player';
    } else if (human === 'Ranged' && cpu === 'Melee') {
      console.log('You lose! Melee beats ranged.');
      return 'Cpu';
    } else if (human === 'Ranged' && cpu === 'Magic') {
      console.log('You win! Ranged beats magic.');
      return 'Player';
    } else {
      console.log("It's a draw!");
      return 'Draw';
    }
  };

  const playRound = () => {
    let humanChoice = getHumanChoice();
    let computerChoice = getComputerChoice();

    console.log('Your attack: ', humanChoice);
    console.log("Oponent's attack: ", computerChoice);
    return determineWinner(humanChoice, computerChoice);
  };

  let playerScore = 0;
  let cpuScore = 0;

  while (playerScore <= 5 || cpuScore <= 5) {
    let result = playRound();

    if (result === 'Player') {
      playerScore++;
    } else if (result === 'Cpu') {
      cpuScore++;
    }

    console.log(`Your Score: ${playerScore}`);
    console.log(`Opponent Score:  ${cpuScore}`);

    if (playerScore === 5) {
      console.log('You win!');
      break;
    } else if (cpuScore === 5) {
      console.log('You lose!');
      break;
    }
  }

  const playAgain = confirm('Would you like to play again');

  if (playAgain) {
    playGame();
  } else {
    return console.log('Thank you for playing!');
  }
};

let startGame = confirm('Do you want to play?');

if (startGame) {
  playGame();
}
