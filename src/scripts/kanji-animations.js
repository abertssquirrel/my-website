const kanjiWrapper = document.querySelector('.kanji-wrapper');
const snowLi = document.getElementById('snow-li');
const snowFact = document.getElementById('snow-facts');
const snowBtn = document.getElementById('snow-btn');
const rainBtn = document.getElementById('rain-btn');
const fireflyBtn = document.getElementById('firefly-btn');
const starBtn = document.getElementById('star-btn');
const windBtn = document.getElementById('wind-btn');
const twoGusts = document.getElementById('two-gusts');

snowBtn.addEventListener('click', snow);
rainBtn.addEventListener('click', rain);
fireflyBtn.addEventListener('click', firefly);
starBtn.addEventListener('click', star);
windBtn.addEventListener('click', toggleWind);

function clear() {
  kanjiWrapper.removeAttribute('data-effect');
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle) => particle.remove());
  twoGusts.classList.add('wind-hide');
  twoGusts.classList.remove('wind-appear');
}

/* SNOW KANJI */

function snow() {
  const isSnowing = !!document.querySelector('.snow');
  clear();

  if (isSnowing) {
    return;
  }

  const width = window.innerWidth;

  let snowFlakes = Math.floor(width / 35);
  const maxFlakes = snowFlakes;

  const positionsArray = randomlyEven(maxFlakes);

  while (snowFlakes > 0) {
    const snowFlake = document.createElement('div');
    snowFlake.classList.add('snow', 'snow-position', 'particle');
    snowFlake.setAttribute('aria-hidden', 'true');
    snowFlake.innerText = '雪';
    // console.log(snowFlake.classList.contains('snow'));
    /* random snow flake position, duration, and size */
    let left = positionsArray[snowFlakes - 1] * 100;
    const randomDuration = randomIntFromInterval(5000, 8000);
    let size;
    if (snowFlakes % 13 === 0) {
      size = randomIntFromInterval(30, 50);
    } else {
      size = randomIntFromInterval(6, 25);
    }

    let delay;
    /*makes it seem like the snow starts falling gradually */
    if (Math.random() * maxFlakes < 3) {
      delay = randomIntFromInterval(0, 1000);
    } else {
      delay = randomIntFromInterval(1000, 18000);
    }

    const rate = 300 / randomDuration;
    const height = window.innerHeight;
    const duration = height / rate;

    snowFlake.style.animationDuration = duration + 'ms';
    snowFlake.style.animationDelay = delay + 'ms';
    snowFlake.style.left = left + '%';
    snowFlake.style.fontSize = size + 'px';

    kanjiWrapper.appendChild(snowFlake);
    // console.log(snowFlake.style.animationDelay);

    snowFlakes--;
  }
}

/* RAIN KANJI */

function rain() {
  const isRaining = !!document.querySelector('.drop');
  clear();
  if (isRaining) {
    return;
  }

  kanjiWrapper.setAttribute('data-effect', 'rain');

  const width = window.innerWidth;

  let rainDrops = Math.floor(width / 55);
  const maxDrops = rainDrops;

  const positionsArray = randomlyEven(maxDrops);

  while (rainDrops > 0) {
    const rainDrop = document.createElement('div');
    rainDrop.classList.add('drop', 'particle');
    rainDrop.setAttribute('aria-hidden', 'true');
    rainDrop.innerHTML = `<span>雨</span>
        <svg width="200" viewBox="0 0 200 30">
          <ellipse
            id="ripple-ellipse"
            cx="100"
            cy="15"
            rx="90"
            ry="12"
            fill="none"
            stroke-width="3"
          />
        </svg>`;

    /* random raindrop position, fall length, duration based on fall length , and size (the larger the longer the fall)  */
    let left = positionsArray[rainDrops - 1] * 100;

    let size = randomIntFromInterval(10, 25);
    /*need value to place kanji in ripple*/
    rainDrop.style.setProperty('--kanji-font-size', size + 'px');

    /*const fakeGravity = 700 / 5000; px per ms*/
    let duration = 3000;
    let delay;
    /*makes it seem like the rain starts falling gradually */
    if (rainDrops + 3 > maxDrops) {
      delay = randomIntFromInterval(0, 1000);
    } else {
      delay = randomIntFromInterval(1000, 10000);
    }
    rainDrop.style.setProperty('--animation-delay', delay + 'ms');

    /*raindrop color!!!*/

    const colorsArray = [
      'var(--bg-blue)',
      'var(--bg-pink)',
      'var(--bg-yellow)',
    ];
    const color = randomItem(colorsArray);

    rainDrop.style.setProperty('--drop-clr', color);

    rainDrop.style.animationDuration = duration + 'ms';
    /*rainDrop.style.animationDelay = delay + 'ms';*/
    rainDrop.style.left = left + '%';
    rainDrop.style.fontSize = size + 'px';

    kanjiWrapper.appendChild(rainDrop);
    // console.log(snowFlake.style.animationDelay);

    rainDrops--;
  }
}

/* FIREFLY KANJI */

function firefly() {
  const isFirefly = !!document.querySelector('.firefly');
  clear();
  if (isFirefly) {
    return;
  }

  /* darken background in kanji-wrapper*/
  kanjiWrapper.setAttribute('data-effect', 'twilight');

  const width = window.innerWidth;
  let fireflies = Math.floor(width / 50);
  const maxFireflies = fireflies;

  while (fireflies > 0) {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly', 'particle');
    firefly.setAttribute('aria-hidden', 'true');
    firefly.innerHTML = `<span>蛍</span>`;

    /* random firefly position excluding top 1/4*/
    let left = randomIntFromInterval(0, 100);
    let top = randomIntFromInterval(25, 100);

    firefly.style.left = left + '%';
    firefly.style.top = top + '%';
    let flyDuration = randomIntFromInterval(8000, 12000);
    firefly.style.setProperty('--fly-duration', flyDuration + 'ms');
    let direction = randomItem(['forwards', 'backwards']);
    firefly.style.setProperty('--direction', direction);
    let size = randomIntFromInterval(6, 25);
    firefly.style.setProperty('--bug-size', size + 'px');
    let blinkDuration = randomIntFromInterval(3000, 7000);
    firefly.style.setProperty('--blink-duration', blinkDuration + 'ms');
    let blinkDelay = randomIntFromInterval(0, 8000);
    firefly.style.setProperty('--blink-delay', blinkDelay + 'ms');

    kanjiWrapper.appendChild(firefly);

    fireflies--;
  }
}

/* STAR KANJI */

function star() {
  const isStar = !!document.querySelector('.star');
  clear();
  if (isStar) {
    return;
  }

  /* darken background in kanji-wrapper */
  kanjiWrapper.setAttribute('data-effect', 'twilight');

  const width = window.innerWidth;
  let stars = Math.floor(width / 8);
  const maxStars = stars;

  while (stars > 0) {
    const star = document.createElement('div');
    star.classList.add('star', 'particle');
    star.setAttribute('aria-hidden', 'true');
    star.innerHTML = `<span>星</span>`;

    /* random position for star */
    let left = randomIntFromInterval(0, 100);
    let top = randomIntFromInterval(0, 100);

    star.style.left = left + '%';
    star.style.top = top + '%';

    /* random size star */
    let size = randomIntFromInterval(3, 16);
    star.style.setProperty('--star-size', size + 'px');

    /* random color star */
    let glow = randomItem([
      'rgb(0, 142, 224)',
      'var(--accent-pink)',
      'var(--bg-yellow)',
    ]);
    star.style.setProperty('--star-glow', glow);

    /* random twinkle delay */
    let delay = randomIntFromInterval(0, 20000);
    star.style.setProperty('--twinkle-delay', delay + 'ms');

    kanjiWrapper.appendChild(star);

    stars--;
  }
}

/* WIND KANJI */

function toggleWind() {
  const isBlowing = twoGusts.classList.contains('wind-appear');
  clear();

  if (isBlowing) return;
  twoGusts.classList.toggle('wind-hide');
  twoGusts.classList.toggle('wind-appear');
}

/* UTILITY FUNCTIONS */
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomItem(array) {
  return array[randomIntFromInterval(0, array.length - 1)];
}

function randomlyEven(count) {
  const width = 1 / count;
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(i * width + width * Math.random());
  }
  return items;
}

const normalize = (
  number,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1,
) => {
  // First, normalize the value between 0 and 1.
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  // Next, transpose that value to our desired scale.
  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};
