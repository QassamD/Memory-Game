// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  // Pormpt window To Ask Name
  let yourName = prompt("Whats Your Name?");
  // if Name is Empty
  if (yourName == null || yourName == "") {
    // Set Unlnown Is Empty
    document.querySelector(".name span").innerHTML = "Unknown";

    // Name is Not Empty
  } else {
    // Set Name to your Name
    document.querySelector(".name span").innerHTML = yourName;
  }
  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();

  timer();

  document.getElementById("play").play().loop;
};

// Effect Duration
let duration = 700;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Block
let blocks = Array.from(blocksContainer.children);

// return

// Create Range Keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add Css Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The Flip Block Functipn
    flipBlock(block);
  });
  // End Game Function
});
// endGame();
// // End Game After 5 min function
// function endGame() {
//   let allMatchBlocks = blocks.filter((matchBlock) =>
//     matchBlock.classList.contains("has-match")
//   );

//   if (allMatchBlocks.length < 20) {
//     setInterval(() => {
//       blocks.filter((removeFlip) => {
//         removeFlip.classList.remove("is-flipped");
//         removeFlip.classList.remove("has-match");
//       });
//     }, 10000);
//   }
// }

// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");

  // Collect All Flipped Blocks
  let allFlippedBlocks = blocks.filter((flipedBlock) =>
    flipedBlock.classList.contains("is-flipped")
  );

  // If Theres Tow Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// Check Matched Block Function
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add class no Clicking in Main Container
  blocksContainer.classList.add("no-clicking");

  // Set Time to Stop Clicking
  setTimeout(() => {
    // Remove Class no-clicing after the duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // get Random Namber
    random = Math.floor(Math.random() * current);

    // Decrease Length by One
    current--;

    // [1] Save Current Element In Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
}

let time = document.querySelector(".timer-container");
let timeCounter = document.querySelector(".timer");
let seconds = 0,
  minutes = 0;

console.log(time);
// Timer
function timer() {
  // Update the count every 1 second
  time = setInterval(function () {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    // Update the timer in HTML with the time it takes the user to play the game
    timeCounter.innerHTML = `
      ${minutes} 
       Min  
      ${seconds} 
       Sec`;
  }, 1000);
}
