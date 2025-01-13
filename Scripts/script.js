//Script.js

const time = document.querySelector('#timeDisplay');
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');
const lapButton = document.querySelector("#lapButton");
const timerSection = document.querySelector("#timer");
const lapDiv = document.querySelector("#lapDiv");
const rankedLaps = document.querySelector("#rankedLaps");

// These need to be initialized and updated by more than one function
let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
// these are needed for the lap function
let lapArray = [];
let count = 0;
let eachLapArray = [];
let differenceArray = [];
let formattedEachLapArray = [];
let infoArray = [];

// my button for the event listener
const numberOfButtons = document.querySelectorAll("button").length;


//Sparkle Sound for Unicorn Mode
for (let i = 0; i < numberOfButtons; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", function () {
    if (document.body.classList.contains("unicorn-mode")) {
      const sparkleSound = new Audio("./assets/sparkle.mp3");
      sparkleSound.play();
    }
  });
}
//Sparkle Sound for Space Mode
for (let i = 0; i < numberOfButtons; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", function () {
    if (document.body.classList.contains("space-mode")) {
      const sparkleSound = new Audio("./Assets/space.mp3");
      spaceSound.play();
    }
  });
}


//Timer 



function startTimer() {
  // if its not running, then start the stopwatch. Use Date.now() to return accurate time as set interval does not.
    if (!running) {
        startTime = Date.now() - difference;
        tInterval = setInterval(updateTime, 10);
        running = true;
        startButton.textContent = "Stop";
    }
    else {
      clearInterval(tInterval);
      running = false;
      startButton.textContent = "Start";
    }
};

//Reset Timer Function
function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    time.innerHTML = "00:00:00:00";
    startButton.innerHTML = "Start";
    lapArray = [];
    localStorage.setItem("Total time of laps", "")
    lapDiv.setAttribute("style", "display:none;");
    lapArray = [];
    count = 0;
    eachLapArray = [];
    differenceArray = [];
    formattedEachLapArray = [];
    infoArray = [];
    
};

//Update Time Function
function updateTime() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const deciseconds = Math.floor((difference % 1000) / 10)

    time.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" + 
                     (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                     (seconds < 10 ? "0" + seconds : seconds) + ":" +
                     (deciseconds);
};

//Lap Time Function

// This creates the best lap, which will be populated later on.
const rLap = document.createElement("p");
rankedLaps.appendChild(rLap);

function lapTime(){
  // Push difference (total time) each time a lap event occurs
  differenceArray.push(difference)
  // The eachLapArray is the length of each lap, derived from the difference array.
  eachLapArray[count] = (isNaN(differenceArray[count]-differenceArray[count-1]) ? differenceArray[count] : (differenceArray[count]-differenceArray[count-1]));
  // formatting for human eyes vs. milliseconds
  const hours = Math.floor((eachLapArray[count] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((eachLapArray[count] % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((eachLapArray[count] % (1000 * 60)) / 1000);
  const deciseconds = Math.floor((eachLapArray[count] % 1000) / 10);
  let formattedCount = (hours < 10 ? "0" + hours : hours) + ":" + 
                   (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                   (seconds < 10 ? "0" + seconds : seconds) + ":" +
                   (deciseconds);
  // Sending now formatted info to the appropriate array
  formattedEachLapArray.push(formattedCount);
  // filling out array of objects, so they can be referenced and ordered while maintaining original array index
  infoArray[count] = {lap: `${count+1}`, lapLength: eachLapArray[count], formattedLapLength: formattedEachLapArray[count]};
  infoArray.sort(function(a,b){return a.lapLength-b.lapLength});
  // updating the "Your Best Lap" p element every time the lap event occurs, if it is in fact the best lap
  rLap.innerHTML = `${infoArray[0].lap}. ${infoArray[0].formattedLapLength}`
  // create lap paragraph element each time lap event occurs
  const lapP = document.createElement("p");
  // append each child to lapDiv section
  lapDiv.appendChild(lapP);
  lapDiv.setAttribute("style", "display:block");
  // push content to lap paragraph
  // populate lap array with laps from the display text and push info to lap paragraph
  lapArray.push(time.textContent);
  lapP.textContent = `${count + 1}.   ${time.textContent}`
  // stringify lap array and info Array and send to local storage
  JSON.stringify(lapArray);
  localStorage.setItem("Total time of laps", lapArray);
  // increasing count
  count++;
};







const toggleButton = document.querySelector('#toggle');
const spaceButton =  document.querySelector('#spaceButton');


//--------MODAL--------
const unicornModal = document.querySelector('#unicornModal');
const closeModalButton = document.querySelector('#closeModal');

// Close the modal when the close button is clicked
 closeModalButton.addEventListener('click', () => {
  unicornModal.style.display = 'none'; // Hide the modal
  });

// Close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
  if (event.target === unicornModal) {
    unicornModal.style.display = 'none'; 
  }
});

 //Event listeners for Buttons
 startButton.addEventListener('click', startTimer);
 resetButton.addEventListener('click', resetTimer);
 lapButton.addEventListener("click", lapTime);

 //
 toggleButton.addEventListener('click', () => {
  const sparkle = new Audio("./assets/sparkle.mp3");
  sparkle.play();
  // Toggle Unicorn Mode on the body element
  document.body.classList.toggle('unicorn-mode');
  getUnicornToggle = document.getElementsByClassName('unicorn-mode');
  let isUnicornMode = document.body.classList.contains("unicorn-mode");

  //If in unicorn mode, we toggle space mode off
  if (isUnicornMode) {
    if(document.body.classList.contains('space-mode')) {
      document.body.classList.toggle('space-mode');
    }
    console.log(document.body.classList.contains("unicorn-mode"));
    unicornModal.style.display = 'flex';
  } 
});
 
////---------------------------Space JS---------------------------
 spaceButton.addEventListener('click', () => {
  const spaceSound = new Audio("./assets/space.mp3");
  spaceSound.play();
  // Toggle Space Mode on the body element
  document.body.classList.toggle('space-mode');
  getUnicornToggle = document.getElementsByClassName('space-mode');
  let isSpaceMode = document.body.classList.contains("space-mode");
  //If in space mode, we toggle unicorn mode off
  if (isSpaceMode) {
    if(document.body.classList.contains('unicorn-mode')) {
      document.body.classList.toggle('unicorn-mode');
    }
  } 
});



