const time = document.querySelector('#timeDisplay');
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');
const lapButton = document.querySelector("#lapButton");
const timerSection = document.querySelector("#timer");
const lapDiv = document.querySelector("#lapDiv");
const stopwatch = { elapsedTime: 0 };

startButton.addEventListener('click', () => {
  if (startButton.innerHTML === 'Start') {
    startStopwatch();
    startButton.innerHTML = 'Stop'
  } else {
    stopwatch.elapsedTime += Date.now() - stopwatch.startTime
    clearInterval(stopwatch.intervalId)
    startButton.innerHTML = 'Start'
  }
})

resetButton.addEventListener('click', () => {
  stopwatch.elapsedTime = 0
  stopwatch.startTime = Date.now()
  displayTime(0, 0, 0, 0)
})

function startStopwatch() {

  stopwatch.startTime = Date.now();

  stopwatch.intervalId = setInterval(() => {

    const elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime

    const milliseconds = parseInt((elapsedTime%1000)/10)
    const seconds = parseInt((elapsedTime/1000)%60)
    const minutes = parseInt((elapsedTime/(1000*60))%60)
    const hour = parseInt((elapsedTime/(1000*60*60))%24);

    displayTime(hour, minutes, seconds, milliseconds)
  }, 100);
}

function displayTime(hour, minutes, seconds, milliseconds) {
  const leadZeroTime = [hour, minutes, seconds, milliseconds].map(time => time < 10 ? `0${time}` : time)
  time.innerHTML = leadZeroTime.join(':')
}

lapButton.addEventListener("click", function(){
  lapTime();
})

  // create lap array
let lapArray = [];

// reset button clears the lap time as well
function lapTime(){
  // create lap paragraph element
  const lapP = document.createElement("p")
  // append child to lapDiv section
  lapDiv.appendChild(lapP);
  // push content to lap paragraph
  lapP.textContent = time.textContent;
  // populate lap array with laps
  lapArray.push(lapP.textContent)
  // stringify lap array and send array to local storage
  JSON.stringify(lapArray);
  localStorage.setItem("laps", lapArray);
}