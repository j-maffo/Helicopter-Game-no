// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables (Once)
let blueHeliImg = document.createElement("img");
blueHeliImg.src = "img/heliBlueTransparent.png";

let greenHeliImg = document.createElement("img");
greenHeliImg.src = "img/heliGreenTransparent.png";

let explosion = document.createElement("audio");
explosion.src = "sound/explosion.wav";

let propeller = document.createElement("audio");
propeller.src = "sound/propeller.wav";

let multiplierImg = document.createElement("img");
multiplierImg.src = "img/2x multiplier.png";

let mouseisPressed = false;

let mult = 1;

// Other Varibles
let best = 0;
let multiplier;

// Global Variables (Reset)
let state = "start";
let heli;
let wall1, wall2, wall3;
let distance;
let currentHeliImg = blueHeliImg;
let gameColour;
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}
// EVENT STUFF
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
  mouseisPressed = true;

  // Play Propeller sound
  propeller.currentTime = 0;
  propeller.play();

  if (state === "start") {
    state = "gameon";
  }
}
function mouseupHandler() {
  mouseisPressed = false;
  propeller.pause();
}
