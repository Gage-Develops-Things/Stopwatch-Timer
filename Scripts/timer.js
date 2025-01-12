const goButton = document.querySelector('#goButton');
const clearButton = document.querySelector('#clearButton');
const time = document.querySelector('#timeDisplay');

let userInput = 10000;
let running = false;
let timerInterval;

goButton.addEventListener("click", function(){
    if (running){
        goButton.innerHTML = "Start"
        clearInterval(timerInterval);
        running = false;
    }
    else {
        startTimer();
        goButton.innerHTML = "Pause"
        running = true;
    }
});

clearButton.addEventListener("click", function(){
    resetTimer();
})

function startTimer() {
  // Sets interval in variable
  timerInterval = setInterval(function () {

    const hours = Math.floor((userInput / 1000)% (60 * 60 * 24));
    const minutes = Math.floor((userInput / 1000) % (60 * 60));
    const seconds = Math.floor((userInput / 1000) % 60);
    const centiseconds = Math.floor((userInput)/ 10)
    console.log(seconds)

    time.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" + 
    (minutes < 10 ? "0" + minutes : minutes) + ":" + 
    (seconds < 10 ? "0" + seconds : seconds) + ":" +
    (centiseconds);

    if (userInput <= 0) {
        clearInterval(timerInterval);
        time.setAttribute("style", "color:red;")
        time.innerHTML = "Time is Up!"
    }

    userInput --;

  }, 10);
};

function resetTimer(){
    clearInterval(timerInterval);
    time.innerHTML = "00:00:00:00";
    time.setAttribute("style", "color:white;")
    running = false;
    goButton.innerHTML = "Start"
}

