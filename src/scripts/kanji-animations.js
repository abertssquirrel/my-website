const snowLi = document.getElementById('snow-li');
const snowFact = document.getElementById('snow-facts');
const snowBtn = document.getElementById('snow-btn');
const rainBtn = document.getElementById('rain-btn');
const kanjiWrapper = document.querySelector('.kanji-wrapper');
const windBtn = document.getElementById('wind-btn');
const twoGusts = document.getElementById('two-gusts');

snowBtn.addEventListener('click', snow);
rainBtn.addEventListener('click', rain);
windBtn.addEventListener('click', toggleWind);

/*function snowFactsToggle() {
  console.log('facts about snow kanji');
  snowFact.classList.toggle('appear');
  snowFact.classList.toggle('vanish');
}*/

function clear() {
  kanjiWrapper.removeAttribute('data-effect');
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle) => particle.remove());
}

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

/* rain emoji stuff! */

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
    rainDrop.classList.add('drop', 'rain-position', 'particle');
    rainDrop.setAttribute('aria-hidden', 'true');
    rainDrop.innerHTML = `<span>雨</span>
        <svg class="ripple" width="200" viewBox="0 0 200 30">
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

    /*translateY in rain animation*/
    /*
    let fall = normalize(size, 10, 30, 55, 90);
    console.log(fall);
    rainDrop.style.setProperty('--fall-percent', fall + 'vh');
    let fallPx = (window.innerHeight * fall) / 100;
    console.log(fallPx);
    */

    /*const fakeGravity = 700 / 5000; px per ms*/
    let duration = 3000; /*fallPx / fakeGravity;*/
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

/* wind emoji stuff */

function toggleWind() {
  clear();
  twoGusts.classList.toggle('wind-hide');
  twoGusts.classList.toggle('wind-appear');

  /*toggle off if hit any other button */
  if (
    twoGusts.classList.contains('wind-appear') &&
    !twoGusts.classList.contains('wind-hide')
  ) {
    snowBtn.addEventListener('click', (e) => {
      twoGusts.classList.add('wind-hide');
      twoGusts.classList.remove('wind-appear');
    });

    rainBtn.addEventListener('click', (e) => {
      twoGusts.classList.add('wind-hide');
      twoGusts.classList.remove('wind-appear');
    });
  }
}
