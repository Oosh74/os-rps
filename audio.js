let musicBtn = document.getElementById('music-btn');
let audioFile = new Audio('/assets/audio/Scape_Main.mp3');
let playMusic = false;

musicBtn.addEventListener('click', () => {
  if (!playMusic) {
    audioFile.play();
    musicBtn.style.backgroundImage =
      'url(/assets/images/osrs-music-icon-mute.png)';
    playMusic = true;
  } else {
    audioFile.pause();
    musicBtn.style.backgroundImage =
      'url(/assets/images/osrs-music-icon\\(2\\).png)';
    playMusic = false;
  }
});
