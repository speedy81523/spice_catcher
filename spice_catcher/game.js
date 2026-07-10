
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const instructionPlaceholder = document.getElementById('instruction-placeholder');
const basketPlaceholder = document.getElementById('basket-placeholder');

let timerInterval = null;
let timeLeft = 60;

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
  }, 1000);
}

function Reset() {
  startBtn.hidden = true;
  resetBtn.hidden = true;
  StartGame();
}