let rollButton = document.querySelector(".roll");
let dice_container = document.querySelector(".dice_cont");
let dice = Array.from(document.querySelectorAll(".item")); // Convert NodeList to an array
let textBack = document.querySelector(".text_cont");
let resetButton = document.querySelector(".resetButton")



let clickedDice = [];

function resetGame() {
  // Clear values on dice
  dice.forEach((die) => {
    die.textContent = "";
    die.classList.remove("active");
  });

  // Re-enable the roll button
  rollButton.disabled = false;

  // Clear the clickedDice array
  clickedDice = [];
}
resetButton.addEventListener("click", resetGame);



function roll() {
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
      }
      setTimeout(continuousRoll, 1000);
    } else {
      alert("Yay.... Congrats, You Win!!!");
      resetGame();
    }
  }

  continuousRoll();
}
rollButton.addEventListener("click", roll);




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
