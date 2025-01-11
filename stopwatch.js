// stopwatch.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.querySelector('.display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap'); // New Lap button
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function start() {
    startButton.disabled = true; // Disable the Start button to prevent multiple intervals
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function pause() {
    startButton.disabled = false; // Enable the Start button when paused
    clearInterval(timerInterval);
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
    startButton.disabled = false;
}

// Add a lap time
function addLap() {
    const lapTime = document.createElement('li');
    lapTime.textContent = formatTime(elapsedTime);
    lapTime.classList.add('lap-item');
    lapsContainer.appendChild(lapTime);
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', addLap); // Lap button functionality

updateDisplay();
