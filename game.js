const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const timeBoard = document.querySelector('.time');
const startButton = document.querySelector('.start-button');
const scoreDecrement = 2;

let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 30;
let gameStarted = false; 

startButton.addEventListener('click', () => {
  startGame();
});

function startGame() {
  timeLeft = 30;
  score = 0;
  scoreBoard.textContent = `Puntuació: ${score}`;
  timeBoard.textContent = `Temps: ${timeLeft}`;
  gameStarted = true; 


  const timer = setInterval(() => {
    timeLeft--;
    timeBoard.textContent = `Tiempo: ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      alert(`¡Tiempo agotado! Puntuación final: ${score}`);

      // Ofrecer la opción de volver a jugar
      const playAgain = confirm('¿Quieres jugar de nuevo?');
      if (playAgain) {
        startGame();
      }
    }
  }, 1000);
  showMole();
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function randomImage() {
  const images = ['imatgesaudios/topoSI.jpg'];
  return images[Math.floor(Math.random() * images.length)];
}

function showImageOnMole(mole) {
  if (mole.src.endsWith('topoSI.jpg')) {
    const image = document.createElement('img');
    image.src = 'imatgesaudios/topoPam.jpg';
    image.classList.add('top-image');
    image.style.width = '45px'; 
    image.style.height = '45px'; 
    mole.parentNode.appendChild(image);
    setTimeout(() => {
      image.parentNode.removeChild(image);
    }, 500);
    const audio = new Audio('imatgesaudios/boing.mp3');
    audio.play();
    score += 5;
    scoreBoard.textContent = `Puntuación: ${score}`;
  }
}

moles.forEach(mole => {
  mole.addEventListener('click', () => {
    if (mole.src.endsWith('topoSI.jpg')) {
      showImageOnMole(mole);
      score += 5;
      scoreBoard.textContent = `Puntuación: ${score}`;
      const audio = new Audio('imatgesaudios/boing.mp3');
      audio.play();
    } else {
      score -= scoreDecrement;
      scoreBoard.textContent = `Puntuación: ${score}`;
    }
  });
});

function updateMole(hole) {
  const mole = hole.querySelector('.mole');
  const originalSrc = mole.src;
  const randomSrc = randomImage();
  mole.src = randomSrc;
  mole.style.visibility = 'visible';
  setTimeout(() => {
    mole.src = originalSrc;
    mole.style.visibility = 'visible';
  }, 1000);
}                   

setInterval(() => {
  const holeIndex = Math.floor(Math.random() * holes.length);
  const hole = holes[holeIndex];
  const mole = hole.querySelector('.mole');
  if (hole.classList.contains('up')) {
    return; 
  }
  const originalSrc = mole.src;
  const randomSrc = randomImage();
  mole.src = randomSrc;
  mole.style.visibility = 'visible';

  setTimeout(() => {
    mole.src = originalSrc;
    mole.style.visibility = 'visble';
  }, 1000);
}, 2000);

holes.forEach(hole => {
  hole.addEventListener('click', () => {
    if (hole.classList.contains('up')) {
      showImageOnMole(hole.querySelector('.mole'));
    }
  });
});
