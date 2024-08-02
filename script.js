const playRound = () => {
  let getComputerChoice = () => {
    let num = Math.floor(Math.random() * (4 - 1) + 1);
    console.log(num);
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

  getComputerChoice();
  humanChoice();

  console.log('This is the human choice,', humanChoice);
  console.log('This is the computer choice', getComputerChoice);

  if (humanChoice === 'Melee' && getComputerChoice === 'Ranged') {
    console.log('You win! Melee beats Ranged.');
    return 'Player';
  } else if (humanChoice === 'Melee' && getComputerChoice === 'Magic') {
    console.log('You lose! Magic beats Melee.');
    return 'Cpu';
  } else if (humanChoice === 'Magic' && getComputerChoice === 'Ranged') {
    console.log('You lose! Ranged beats Magic');
    return 'Cpu';
  } else if (humanChoice === 'Magic' && getComputerChoice === 'Melee') {
    console.log('You win! Magic beats melee.');
    return 'Player';
  } else if (humanChoice === 'Ranged' && getComputerChoice === 'Melee') {
    console.log('You lose! Melee beats ranged.');
    return 'Cpu';
  } else if (humanChoice === 'Ranged' && getComputerChoice === 'Magic') {
    console.log('You win! Ranged beats magic.');
    return 'Player';
  } else {
    console.log("It's a draw!");
    return 'Draw';
  }
};

const playGame = () => {
  let playerScore = 0;
  let cpuScore = 0;

  while (playerScore <= 5 || cpuScore <= 5) {
    let result = playRound();

    if (result === 'Player') {
      playerScore++;
    } else if (result === 'Cpu') {
      cpuScore++;
    }

    console.log(`Player Score ${playerScore}`);
    console.log(`Cpu ${cpuScore}`);

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

playGame();
