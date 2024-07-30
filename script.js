console.log('hello world');

const getComputerChoice = () => {
  let num = Math.floor(Math.random() * (4 - 1) + 1);

  if (num === 1) {
    console.log('Melee');
  } else if (num === 2) {
    console.log('Ranged');
  } else {
    console.log('Magic');
  }
};

getComputerChoice();

let humanChoice = () => {
  let choice = prompt('Melee, Ranged, or Magic?').toLowerCase();

  if (choice === 'melee' || choice === 'ranged' || choice === 'magic') {
    return (humanChoice = choice);
  } else {
    alert('Invalid choice, try again');
    humanChoice();
  }
};

humanChoice();
console.log('This is the human choice,', humanChoice);
