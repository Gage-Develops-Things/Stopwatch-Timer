const goButton = document.querySelector('#goButton');
const clearButton = document.querySelector('#clearButton');

let userInput = 3000;

let running = false;

goButton.addEventListener("click", function(){
    if (running){
        goButton.innerHTML = "Start"
        // pause the function.
    }
    else {
        startTimer();
        goButton.innerHTML = "Pause"
    }
});

function startTimer(){
    
};