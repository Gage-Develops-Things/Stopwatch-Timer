const time = document.querySelector('#timeDisplay')
const startButton = document.querySelector('#startButton')
const resetButton = document.querySelector('#resetButton')
const stopwatch = { elapsedTime: 0 }

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


// Add processes and call functions
//Test from bootstrap website//

/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    'use strict'
  
    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)
  
    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme()
      if (storedTheme) {
        return storedTheme
      }
  
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  
    const setTheme = theme => {
      if (theme === 'auto') {
        document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
      } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
      }
    }
  
    setTheme(getPreferredTheme())
  
    const showActiveTheme = (theme, focus = false) => {
      const themeSwitcher = document.querySelector('#bd-theme')
  
      if (!themeSwitcher) {
        return
      }
  
      const themeSwitcherText = document.querySelector('#bd-theme-text')
      const activeThemeIcon = document.querySelector('.theme-icon-active use')
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
      const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')
  
      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active')
        element.setAttribute('aria-pressed', 'false')
      })
  
      btnToActive.classList.add('active')
      btnToActive.setAttribute('aria-pressed', 'true')
      activeThemeIcon.setAttribute('href', svgOfActiveBtn)
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
      themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)
  
      if (focus) {
        themeSwitcher.focus()
      }
    }
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme()
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
      }
    })
  
    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(getPreferredTheme())
  
      document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
          toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')
            setStoredTheme(theme)
            setTheme(theme)
            showActiveTheme(theme, true)
          })
        })
    })
  })()

  //test end here//
  
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

