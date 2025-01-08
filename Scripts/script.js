// Declare global variables
let body = document.body;
let startButton = document.getElementById("startButton"); 
let resetButton = document.getElementById("resetButton"); 
let timeDisplay = document.getElementById("timeDisplay");
let lap = document.getElementById("lapButton");
let isRunning = false;
let timerInterval;
let time = 0;

// Create functions


















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

startButton.addEventListener("click", function() {
	if (isRunning) {
	clearInterval(timerInterval);
	startButton.textContent = "Start";
 } else {
	timerInterval = setInterval(function() {
	time++;
	timeDisplay.textContent = formatTime(time);
 	}, 1000);
	startButton.textContent = "Stop";
	}
	isRunning = !isRunning;
});