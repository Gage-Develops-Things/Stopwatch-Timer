//Script.js

const time = document.querySelector('#timeDisplay');
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');
const lapButton = document.querySelector("#lapButton");
const timerSection = document.querySelector("#timer");
const lapDiv = document.querySelector("#lapDiv");

// my button for the event listener

const numberOfButtons = document.querySelectorAll("button").length;

for (let i=0; i<numberOfButtons; i++){
  document.querySelectorAll("button")[i].addEventListener("click", function(){
    const sparkleSound = new Audio("./assets/sparkle.mp3")
    sparkleSound.play();
  });
};

let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let lapArray = [];

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

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    time.innerHTML = "00:00:00:00";
    startButton.innerHTML = "Start";
    lapArray = [];
    lapDiv.textContent = "";
    localStorage.setItem("laps", "")
};

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


//--------MODAL--------
const toggleButton = document.querySelector('#toggle');
const unicornModal = document.querySelector('#unicornModal');
const closeModalButton = document.querySelector('#closeModal');



toggleButton.addEventListener('click', () => {
  // Toggle Unicorn Mode on the body element
  document.body.classList.toggle('unicorn-mode');
  getUnicornToggle = document.getElementsByClassName('unicorn-mode');
  let isUnicornMode = document.body.classList.contains("unicorn-mode");

  if (isUnicornMode) {
    console.log(document.body.classList.contains("unicorn-mode"));
    unicornModal.style.display = 'flex';
  } 
});


// Close the modal when the close button is clicked
 closeModalButton.addEventListener('click', () => {
  unicornModal.style.display = 'none'; // Hide the modal
  });

// Close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
  if (event.target === unicornModal) {
    unicornModal.style.display = 'none'; // Hide the modal if clicked outside
  }
});

 //Event listeners
 startButton.addEventListener('click', startTimer);
 resetButton.addEventListener('click', resetTimer);
 lapButton.addEventListener("click", lapTime);