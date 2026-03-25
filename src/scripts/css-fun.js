const playBtn = document.querySelector('.play-btn');
const madlibAudio = document.querySelector('.madlib-audio');
const madlibSpan = document.querySelector('.madlib-span');

playBtn.addEventListener('click', playPause);

function playPause() {
  const action = playBtn.innerText.startsWith('Play') ? 'play' : 'pause';
  playBtn.innerText = `${action === 'play' ? 'Pause' : 'Play'} Madlib ?`;
  if (action === 'play') madlibAudio.play();
  else madlibAudio.pause();
  madlibSpan.classList.toggle('appear');
}
