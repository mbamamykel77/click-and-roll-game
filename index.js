let rollButton = document.querySelector(".roll");
let dice_container = document.querySelector(".dice_cont");
let dice = Array.from(document.querySelectorAll(".item")); // Convert NodeList to an array
let textBack = document.querySelector(".text_cont");
let resetButton = document.querySelector(".resetButton")
let congratsCont = document.querySelector(".congrats");
let congratsHour = document.getElementById("congrats_hour")
let congratsMinute = document.getElementById("congrats_minute")
const congratsSeconds = document.getElementById("congrats_second");



// =============================================================================================
// The timer funtion 
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

// let cron;

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  congratsSeconds.innerText = document.getElementById('second').innerText
  congratsMinute.textContent = document.getElementById('minute').innerText
  congratsHour.textContent = document.getElementById('hour').innerText
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
  return input > 10 ? input : `0${input}`
}


// =================================================================================================
  // Clear values on dice and reset the timer
let clickedDice = [];

function resetGame() {
  dice.forEach((die) => {
    die.textContent = "";
    die.classList.remove("active");
  });

  // Re-enable the roll button
  rollButton.disabled = false;

  // Clear the clickedDice array
  clickedDice = [];

  // call the reset function to reset the timer.
  reset();
}
resetButton.addEventListener("click", resetGame);

// Interval ID for the timer
let cron;

function pause() {
  clearInterval(cron);
}

function reset() {
  pause();
  
  // Reset timer variables
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;

  // Update displayed timer values
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  // document.getElementById('millisecond').innerText = '000';
}




// =================================================================================================
let timerStarted = false;


function roll() {
  if (!timerStarted) {
    start(); // Start the timer only if it hasn't started already
    timerStarted = true;
  }

  rollButton.disabled = true;
  clickedDice = [];

  function checkAllDiceHaveSameValue() {
    const firstValue = dice[0].textContent;
    return dice.every((die) => die.textContent === firstValue);
  }

  // Roll dice continuously until they all have the same value and are clicked
  function continuousRoll() {
    if (!checkAllDiceHaveSameValue() || clickedDice.length < dice.length) {
      for (let i = 0; i < dice.length; i++) {
        if (!dice[i].classList.contains("active")) {
          dice[i].classList.add("roll-animation");
          let randomValue = Math.floor(Math.random() * 6) + 1;
          dice[i].textContent = randomValue;
          dice[i].classList.remove("roll-animation");
          if (!dice[i].classList.contains("active")) {
            dice[i].textContent = randomValue;
          }
        }
        // funtion to start the timer
        start();
        congratsCont.style.display = "none";
      }
      setTimeout(continuousRoll, 700);
    } else {
      resetGame();
      congratsCont.style.display = "block";
    }
  }

  continuousRoll();
}
rollButton.addEventListener("click", roll);

function start() {
  pause();
  cron = setInterval(() =>{ timer(); }, 10);
}


// =================================================================================================
// funtion to show active dice button that is clicked and frozen
function dicey() {
  this.classList.toggle("active");

  if (this.classList.contains("active")) {
    clickedDice.push(this.textContent);
  } else {
    const index = clickedDice.indexOf(this.textContent);
    if (index !== -1) {
      clickedDice.splice(index, 1);
    }
  }
}
for (let i = 0; i < dice.length; i++) {
  dice[i].addEventListener("click", dicey);
}
