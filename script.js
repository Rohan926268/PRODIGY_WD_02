let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateDisplay(time) {
  const ms = time % 1000;
  const totalSeconds = Math.floor(time / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  display.textContent = 
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}.` +
    `${String(ms).padStart(3, '0')}`;
}

function startStop() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 10);
    startStopBtn.textContent = 'Pause';
    running = true;
  } else {
    clearInterval(timerInterval);
    running = false;
    startStopBtn.textContent = 'Start';
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  running = false;
  updateDisplay(0);
  startStopBtn.textContent = 'Start';
  laps.innerHTML = '';
}

function recordLap() {
  if (!running) return;
  const li = document.createElement('li');
  li.textContent = display.textContent;
  laps.appendChild(li);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
