let rollButton = document.querySelector(".roll")
let dice_container = document.querySelector(".dice_cont")
let dice = document.querySelectorAll(".item")

// rollButton.style.backgroundColor = "red"
// dice.style.backgroundColor = "red"

// for (let i = 0; i < dice.length; i++){
//     dice[i].style.backgroundColor = "red"
//     console.log("are you working?")

// }


function roll (){
    for (let i = 0; i < dice.length; i++){ 
        let randomValue = Math.floor(Math.random() * 6) + 1; // Generates a random number from 1 to 6
        dice[i].textContent = randomValue; // Update the content of the item
        console.log("are you working?")
    }
}

rollButton.addEventListener("click", roll)