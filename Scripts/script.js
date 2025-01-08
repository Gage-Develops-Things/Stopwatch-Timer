let startButton = document.getElementById("startButton");
let resetButton = document.getElementById("resetButton");
let timeDisplay = document.getElementById("timeDisplay");
let isRunning = false;
let timerInterval;
let seconds = 0;
let milliseconds = 0;
let body = document.body;
let lap = document.getElementById("lapButton");
let time = 0;

function formatTime(seconds, milliseconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor(seconds % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}.${pad(milliseconds, 2)}`;
}

function pad(num, length = 2) {
    return num.toString().padStart(length, '0');
}

startButton.addEventListener("click", function() {
    if (isRunning) {
        clearInterval(timerInterval);
        startButton.textContent = "Start";
    } else {
        timerInterval = setInterval(function() {
            milliseconds++;
            if (milliseconds >= 100) {
                milliseconds = 0;
                seconds++;
            }
            timeDisplay.textContent = formatTime(seconds, milliseconds);
        }, 10);
        startButton.textContent = "Stop";
    }
    isRunning = !isRunning;
});


// Add processes and call functions
toggler.addEventListener('change', () => {
    if (toggler.checked) {
        body.classList.remove('dark');
        body.classList.add('unicorn');
        localStorage.setItem('theme', 'unicorn'); // Save preference
    } else {
        body.classList.remove('unicorn');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark'); // Save preference
    }
});

