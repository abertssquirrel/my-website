const snowLi = document.getElementById('snow-li');
const snowFact = document.getElementById('snow-facts');
const snowBtn = document.getElementById('snow-btn');
const kanjiWrapper = document.querySelector('.kanji-wrapper');

snowBtn.addEventListener('click', snow);

/*function snowFactsToggle() {
  console.log('facts about snow kanji');
  snowFact.classList.toggle('appear');
  snowFact.classList.toggle('vanish');
}*/

function snow() {
  /*snowFactsToggle();*/
  const width = window.innerWidth;

  let snowFlakes = Math.floor(width / 35);
  const maxFlakes = snowFlakes;
  console.log(snowFlakes, maxFlakes);

  while (snowFlakes > 0) {
    const snowFlake = document.createElement('div');
    snowFlake.classList.add('snow', 'snow-position');
    snowFlake.setAttribute('aria-hidden', 'true');
    snowFlake.innerText = '雪';
    console.log(snowFlake.classList.contains('snow'));
    /* random snow flake position, duration, and size */
    const left = randomIntFromInterval(0, 100);
    const randomDuration = randomIntFromInterval(5000, 8000);
    let size;
    if (snowFlakes % 13 === 0) {
      size = randomIntFromInterval(30, 50);
    } else {
      size = randomIntFromInterval(6, 25);
    }

    let delay;
    /*makes it seem like the snow starts falling gradually */
    if (snowFlakes + 3 > maxFlakes) {
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
    console.log(snowFlake.style.animationDelay);

    snowFlakes--;
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
