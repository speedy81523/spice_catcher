
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
  scoreDisplay.textContent = '0';
  livesDisplay.textContent = '3';
  instructionPlaceholder.textContent = 'Catch the falling spices and ingredients!';
  instructionPlaceholder.style.display = '';
  basketPlaceholder.style.display = 'none';
  timerDisplay.textContent = `${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = '0s';
      instructionPlaceholder.textContent = 'Time is up! Click Play Again to restart.';
      resetBtn.hidden = false;
      basketPlaceholder.style.display = 'none';
    }
    if (lives == 0){
      clearInterval(timerInterval);
      livesDisplay.textContent = '0';
      instructionPlaceholder.textContent = 'You ran out of Lives! Click Play Again to Restart.';
      resetBtn.hidden = false;
      basketPlaceholder.style.display = 'none';
    }
  }, 700);
}



function Reset() {
  startBtn.hidden = true;
  resetBtn.hidden = true;
  StartGame();
}