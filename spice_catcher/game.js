
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const instructionPlaceholder = document.getElementById('instruction-placeholder');
const basketPlaceholder = document.getElementById('basket-placeholder');




//const debugBtn = document.getElementById('debug-btn');

// Option B: Press the '5' key on your keyboard to lose lives
document.addEventListener('keydown', (event) => {
    if (event.key === '5') {
        lives = 0;
        console.log("Debug: All lives lost!");
    }
});


let timerInterval = null;
let timeLeft = 60;
let lives = 3;
let score = 0;

startBtn.addEventListener('click', () => {
  startBtn.hidden = true;
  resetBtn.hidden = true;
  Reset();
});

resetBtn.addEventListener('click', () => {
  resetBtn.hidden = true;
  Reset();
});

function StartGame() {
  clearInterval(timerInterval);
  
  timeLeft = 60; 
  lives = 3;
  score = 0;
  scoreDisplay.textContent = '0';
  livesDisplay.textContent = '3';
  instructionPlaceholder.textContent = 'Catch the falling spices and ingredients!';
  instructionPlaceholder.style.display = '';
  basketPlaceholder.style.display = 'none';
  timerDisplay.textContent = `${timeLeft}s`;

  startKadhai();
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;
    scoreDisplay.textContent = `${score}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = '0s';
      let finalScore = scoreDisplay.textContent;
      let reason = "Time is up!";

      instructionPlaceholder.textContent = `${reason} Final Score: ${finalScore}. Click Play Again to Restart.`; //show score
      resetBtn.hidden = false;
      basketPlaceholder.style.display = 'none';
      stopKadhai();
    }
    if (lives == 0){
      clearInterval(timerInterval);
      livesDisplay.textContent = '0';
      let finalScore = scoreDisplay.textContent;
      
      instructionPlaceholder.textContent = `You ran out of Lives! Final Score: ${finalScore}. Click Play Again to Restart.`;
      resetBtn.hidden = false;
      basketPlaceholder.style.display = 'none';
      stopKadhai();
    }
  }, 700);
}



//kadhai/wok
const kadhaie = document.getElementById('kadhai');
const gameArea = document.getElementById('game-area');

//kadhai variables
let kadhaiX = 0;
let kadhaiTargetX = 0;
let keyleft = false;
let keyright = false;
const kadhaiSpeed = 900;
let kadhaiLastTs = null;
let kadhaiRunning = false;


function initKadhai() { //init the wox position and such
  const areaWidth = gameArea.clientWidth;
  kadhaiX = areaWidth / 2;
  kadhaiTargetX = areaWidth / 2;
  kadhaie.style.left = kadhaiX + 'px';
  kadhaie.hidden = false;
}

//mouse
gameArea.addEventListener('mousemove', (event) => {
  const rect = gameArea.getBoundingClientRect();
  kadhaiTargetX = event.clientX - rect.left;
});

//touch
gameArea.addEventListener('touchstart', handleTouch, { passive: false });
gameArea.addEventListener('touchmove', handleTouch, { passive: false });


function handleTouch(event) {
  event.preventDefault();
  const touch = event.touches[0];
  if (!touch)
     return;
  const rect = gameArea.getBoundingClientRect();
  kadhaiTargetX = touch.clientX - rect.left;
}

function kadhaiLoop(ts){ //main loop for kadhai movement
  if (!kadhaiRunning) 
    return;

  if (kadhaiLastTs == null)
    kadhaiLastTs = ts;

  const dt = Math.min((ts-kadhaiLastTs)/1000,0.05);
  kadhaiLastTs = ts;

  const areaWidth = gameArea.clientWidth;
  const halfWidth = kadhaie.offsetWidth/2;

  if (keyleft)
    kadhaiTargetX -= kadhaiSpeed * dt;
  if (keyright)
    kadhaiTargetX += kadhaiSpeed * dt;

  kadhaiTargetX = Math.max(halfWidth, Math.min(areaWidth - halfWidth, kadhaiTargetX));

  kadhaiX += (kadhaiTargetX - kadhaiX) * Math.min(1, dt * 12);
  kadhaie.style.left = kadhaiX + 'px';

  requestAnimationFrame(kadhaiLoop);
}


function startKadhai() { //start the movement loop
  initKadhai();
  kadhaiRunning = true;
  kadhaiLastTs = null;
  requestAnimationFrame(kadhaiLoop);
}

function stopKadhai() { //hide the kadhai and stop loop
  kadhaiRunning = false;
  kadhaie.hidden = true;
}
function Reset() {
  startBtn.hidden = true;
  resetBtn.hidden = true;
  StartGame();
}