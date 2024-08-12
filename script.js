let playerScore = 0;
let cpuScore = 0;
let round = 1;
let opponentHP = 100;
let playerHp = 100;

const playerScoreElement = document.getElementById('player-score');
const cpuScoreElement = document.getElementById('cpu-score');
const roundElement = document.getElementById('round');
const playerSelectionElement = document.getElementById('player-selection');
const cpuSelection = document.getElementById('cpu-selection');
const opponenthealthBar = document.querySelector('.opponent-health-bar');
const playerhealthBar = document.querySelector('.player-health-bar');

playerScoreElement.textContent = `Player Score: ${playerScore}`;
cpuScoreElement.textContent = `Player Score: ${playerScore}`;
roundElement.textContent = `Round: ${round}`;

const rangedButton = document.getElementById('ranged-button');
const meleeButton = document.getElementById('melee-button');
const magicButton = document.getElementById('magic-button');

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
  return new Promise((resolve) => {
    const handleButtonClick = (choice) => {
      rangedButton.removeEventListener('click', handleRangedClick);
      meleeButton.removeEventListener('click', handleMeleeClick);
      magicButton.removeEventListener('click', handleMagicClick);
      resolve(choice);
    };

    const handleRangedClick = () => handleButtonClick('Ranged');
    const handleMeleeClick = () => handleButtonClick('Melee');
    const handleMagicClick = () => handleButtonClick('Magic');

    rangedButton.addEventListener('click', handleRangedClick);
    meleeButton.addEventListener('click', handleMeleeClick);
    magicButton.addEventListener('click', handleMagicClick);
  });
};

const determineWinner = (human, cpu) => {
  playerSelectionElement.textContent = `Your Attack: ${human}`;
  cpuSelection.textContent = `Opponent's Attack: ${cpu}`;

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

const updateScores = () => {
  playerScoreElement.textContent = `Player Score: ${playerScore}`;
  cpuScoreElement.textContent = `CPU Score: ${cpuScore}`;
  roundElement.textContent = `Round: ${round}`;
};

const updateHealth = (character) => {
  if (character === 'Player') {
    opponentHP -= 20;
    opponenthealthBar.style.setProperty(
      '--opponent-health-width',
      opponentHP + '%'
    );
  } else if (character === 'Cpu') {
    playerHp -= 20;
    playerhealthBar.style.setProperty('--player-health-width', playerHp + '%');
  } else if (character === 'Draw') {
    return;
  } else {
    opponentHP = 100;
    playerHp = 100;
    opponenthealthBar.style.setProperty(
      '--opponent-health-width',
      opponentHP + '%'
    );
    playerhealthBar.style.setProperty(
      '--player-health-width',
      opponentHP + '%'
    );
  }
};

const playRound = async () => {
  let humanChoice = await getHumanChoice();
  let computerChoice = getComputerChoice();

  console.log('Your attack: ', humanChoice);
  console.log("Oponent's attack: ", computerChoice);

  return determineWinner(humanChoice, computerChoice);
};

const playGame = async () => {
  while (playerScore <= 5 || cpuScore <= 5) {
    let result = await playRound();

    if (result === 'Player') {
      playerScore++;
    } else if (result === 'Cpu') {
      cpuScore++;
    }
    round++;

    updateHealth(result);
    updateScores();

    if (playerScore === 5) {
      updateScores();
      console.log('You win!');
      break;
    } else if (cpuScore === 5) {
      updateScores();
      console.log('You lose!');
      break;
    }
  }

  const playAgain = confirm('Would you like to play again');

  if (playAgain) {
    playerScore = 0;
    cpuScore = 0;
    round = 1;
    updateScores();
    playGame();
    updateHealth();
  } else {
    console.log('Thank you for playing!');
  }
};

const playButton = document.getElementById('play-button');
playButton.addEventListener('click', playGame);
