const rickrollWrapper = document.querySelector('.rickroll-wrapper');
const warning = document.querySelector('.warning');
const lyrics = document.querySelector('.lyrics');
const video = document.querySelector('.video');

window.addEventListener('load', rickroll);

function rickroll() {
  rickrollWrapper.classList.remove('rickroll-hide');
  initTypewriters();
  /* warning appears 2500ms later */
  setTimeout(() => {
    warning.classList.remove('warning-hide');
  }, 3000);

  /* ed emojis begin to spawn after 3000ms */
  setTimeout(() => {
    edEmojiAttack();
  }, 5000);

  setTimeout(() => {
    clear();
  }, 10000);
  /* show video*/
  setTimeout(() => {
    /*video.style.display = 'block';*/
    video.style.animation = 'appear 1000ms ease-in forwards';
  }, 11000);
}

/* clear stuff */

function clear() {
  warning.classList.add('warning-hide');

  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle) => particle.remove());
  lyrics.remove();
}

/* rickroll typewriter effect */

function animate(typewriter) {
  const chars = typewriter.querySelectorAll('span');
  showChar(chars, 0);
}

function showChar(chars, index) {
  const char = chars[index];
  char.classList.add('show');
  setTimeout(() => showChar(chars, index + 1), 5);
}

function initTypewriters() {
  const typewriters = document.querySelectorAll('.typewriter');

  for (const typewriter of typewriters) {
    const ps = typewriter.querySelectorAll('p');

    for (const p of ps) {
      const text = p.textContent;

      const innerHtml = text
        .split('')
        .map((char) => `<span>${char}</span>`)
        .join('');
      p.innerHTML = innerHtml;
    }

    typewriter.classList.add('init');
    animate(typewriter);
  }
}

/* ed-emoji stuff*/

function edEmojiAttack() {
  const edEmojiSvgs = [
    '../../public/assets/svgs/ed-smile-pink.svg',
    '../../public/assets/svgs/ed-whistle-pink.svg',
    '../../public/assets/svgs/ed-crazyeyes-pink.svg',
    '../../public/assets/svgs/ed-forward-pink.svg',
  ];

  let count = 70;
  let speedup = 1;
  let randomDelay = 0;
  while (count > 0) {
    const edEmoji = document.createElement('img');
    edEmoji.classList.add('ed-emoji', 'particle');

    const edEmojiSrc = randomItem(edEmojiSvgs);
    edEmoji.setAttribute('src', edEmojiSrc);

    const randomTilt = randomIntFromInterval(-20, 20);
    edEmoji.style.setProperty('--rotate', randomTilt + 'deg');

    const randomTop = randomIntFromInterval(0, 100);
    edEmoji.style.setProperty('--top', randomTop + '%');
    const randomLeft = randomIntFromInterval(0, 100);
    edEmoji.style.setProperty('--left', randomLeft + '%');

    edEmoji.style.setProperty('--delay', randomDelay + 'ms');
    rickrollWrapper.appendChild(edEmoji);

    randomDelay = randomDelay + 300 / speedup;
    speedup = speedup + 0.2;
    count--;
  }
}

/* add video */

/* UTILITY FUNCTIONS */

function randomItem(array) {
  return array[randomIntFromInterval(0, array.length - 1)];
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
