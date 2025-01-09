const time = document.querySelector('.stopwatch')
const mainButton = document.querySelector('#main-button')
const clearButton = document.querySelector('#clear-button')
const stopwatch = { elapsedTime: 0 }

mainButton.addEventListener('click', () => {
  if (mainButton.innerHTML === 'Start') {
    startStopwatch();
    mainButton.innerHTML = 'Stop'
  } else {
    stopwatch.elapsedTime += Date.now() - stopwatch.startTime
    clearInterval(stopwatch.intervalId)
    mainButton.innerHTML = 'Start'
  }
})

clearButton.addEventListener('click', () => {
  stopwatch.elapsedTime = 0
  stopwatch.startTime = Date.now()
  displayTime(0, 0, 0, 0)
})

function startStopwatch() {
  //reset start time
  stopwatch.startTime = Date.now();
  //run `setInterval()` and save id
  stopwatch.intervalId = setInterval(() => {
    //calculate elapsed time
    const elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime
    //calculate different time measurements based on elapsed time
    const milliseconds = parseInt((elapsedTime%1000)/10)
    const seconds = parseInt((elapsedTime/1000)%60)
    const minutes = parseInt((elapsedTime/(1000*60))%60)
    const hour = parseInt((elapsedTime/(1000*60*60))%24);
    //display time
    displayTime(hour, minutes, seconds, milliseconds)
  }, 100);
}

function displayTime(hour, minutes, seconds, milliseconds) {
  const leadZeroTime = [hour, minutes, seconds, milliseconds].map(time => time < 10 ? `0${time}` : time)
  time.innerHTML = leadZeroTime.join(':')
}




// below Doesnt work
// startButton.addEventListener("click", function() {
// 	if (isRunning) {
// 	clearInterval(timerInterval);
// 	startButton.textContent = "Start";
//  } else {
// 	timerInterval = setInterval(function() {
// 	time++;
// 	timeDisplay.textContent = formatTime(time);
//  	}, 1000);
// 	startButton.textContent = "Stop";
// 	}
// 	isRunning = !isRunning;
// });

// BELOW DOESNT WORK.  WEIRD INBETWEEN SECONDS. TOO SLOW/FAST
// let totalMiliSeconds = 0
// startButton.addEventListener("click", function(){
//   setInterval(() => {
//     totalMiliSeconds += 1;
//     timeDisplay.innerHTML = totalMiliSeconds;
//   }, 1)

//   })


resetButton.addEventListener("click", function(){
timeDisplay.textContent = "00.00.00.00";
});