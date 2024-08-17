let playerScore = 0;
let cpuScore = 0;
let round = 1;
let opponentHP = 100;
let playerHp = 100;

const resultElement = document.getElementById('result');
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

const hitSplat = (character) => {
  const container = document.querySelector(`.character-container.${character}`);
  container.classList.add('show-hit-splat');
  setTimeout(() => {
    container.classList.remove('show-hit-splat');
  }, 3000);
};

const defenseSplat = (character) => {
  const container = document.querySelector(`.character-container.${character}`);
  container.classList.add('show-defense-splat');
  setTimeout(() => {
    container.classList.remove('show-defense-splat');
  }, 3000);
};

const resetGame = () => {
  playerScore = 0;
  cpuScore = 0;
  round = 1;
  updateScores();
  updateHealth();
  resultElement.textContent = 'Choose your attack!';
  playerSelectionElement.textContent = '';
  cpuSelection.textContent = '';
};

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
    resultElement.textContent = `You win! ${human} beats ${cpu}`;
    return 'Player';
  } else if (human === 'Melee' && cpu === 'Magic') {
    resultElement.textContent = `You lose! ${cpu} beats ${human}`;
    return 'Cpu';
  } else if (human === 'Magic' && cpu === 'Ranged') {
    resultElement.textContent = `You lose! ${cpu} beats ${human}`;
    return 'Cpu';
  } else if (human === 'Magic' && cpu === 'Melee') {
    resultElement.textContent = `You win! ${human} beats ${cpu}`;
    return 'Player';
  } else if (human === 'Ranged' && cpu === 'Melee') {
    resultElement.textContent = `You lose! ${cpu} beats ${human}`;
    return 'Cpu';
  } else if (human === 'Ranged' && cpu === 'Magic') {
    resultElement.textContent = `You win! ${human} beats ${cpu}`;
    return 'Player';
  } else {
    resultElement.textContent = `Draw!`;
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
    hitSplat('cpu');
    defenseSplat('player');
    opponentHP -= 20;
    opponenthealthBar.style.setProperty(
      '--opponent-health-width',
      opponentHP + '%'
    );
  } else if (character === 'Cpu') {
    hitSplat('player');
    defenseSplat('cpu');
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
  return determineWinner(humanChoice, computerChoice);
};

const playGame = async () => {
  resetGame();
  playButton.disabled = true;
  playButton.className = 'inactive-btn';

  while (playerScore <= 5 && cpuScore <= 5) {
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
      playerScore++;
      playButton.disabled = false;
      playButton.className = 'play-btn';
      resultElement.textContent = `Game over! You win!`;
      playButton.textContent = 'Play Again';
      break;
    } else if (cpuScore === 5) {
      cpuScore++;
      playButton.disabled = false;
      playButton.className = 'play-btn';
      resultElement.textContent = `Game over! You lose!`;
      playButton.textContent = 'Play Again';
      break;
    }
  }
};

const playButton = document.getElementById('play-button');
playButton.addEventListener('click', playGame);
