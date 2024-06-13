// FUNCTIONS
// add coins
// Draw Start Screen
function drawStart() {
  drawMainComponents();
  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
}

// Draw Game Elements
function runGame() {
  // LOGIC
  moveHeli();
  moveWalls();
  movemultiplier();
  checkCollisions();
  checkDistance();
  // Change Difficulty
  over1000();
  over3000();
  // DRAW
  drawGame();
}
function moveHeli() {
  // Acelerate upwards if mouse is pressed
  if (mouseisPressed) {
    heli.speed += -1;
  }
  // Apply Gravity (accel)
  heli.speed += heli.accel;
  // Constrain Speed (max/min)
  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }
  // Move Helicopter by its speed
  heli.y += heli.speed;
}

function moveWalls() {
  // Wall 1
  wall1.x += -3;
  if (wall1.x + wall1.w < 0) {
    wall1.x = wall3.x + 500;
    wall1.y = Math.random() * 300 + 100;
  }
  // Wall 2
  wall2.x += -3;
  if (wall2.x + wall2.w < 0) {
    wall2.x = wall1.x + 500;
    wall2.y = Math.random() * 300 + 100;
  }
  // Wall 3
  wall3.x += -3;
  if (wall3.x + wall3.w < 0) {
    wall3.x = wall2.x + 500;
    wall3.y = Math.random() * 300 + 100;
  }
}

function movemultiplier() {
  multiplier.x += -3;

  if (multiplier.x + multiplier.w < 0) {
    multiplier.x = wall1.x + 250;
  }
}

function checkDistance() {
  distance += mult * 0.25;
  console.log(distance);
}

function checkCollisions() {
  // Collisions with Top and Bottom Green Bars
  if (heli.y < 50) {
    gameOver();
  } else if (heli.y + heli.h > cnv.height - 50) {
    gameOver();
  }
  // Collision with the Walls
  else if (
    heli.x < wall1.x + wall1.w &&
    wall1.x < heli.x + heli.w &&
    heli.y < wall1.y + wall1.h &&
    wall1.y < heli.y + heli.h
  ) {
    gameOver();
  } else if (
    heli.x < wall2.x + wall2.w &&
    wall2.x < heli.x + heli.w &&
    heli.y < wall2.y + wall2.h &&
    wall2.y < heli.y + heli.h
  ) {
    gameOver();
  } else if (
    heli.x < wall3.x + wall3.w &&
    wall3.x < heli.x + heli.w &&
    heli.y < wall3.y + wall3.h &&
    wall3.y < heli.y + heli.h
  ) {
    gameOver();
  }
  // Check PowerUp Collision
  powerUpCollision();
}
// double distance while thye are both colliding
function powerUpCollision() {
  if (
    heli.x < multiplier.x + multiplier.w &&
    multiplier.x < heli.x + heli.w &&
    heli.y < multiplier.y + multiplier.h &&
    multiplier.y < heli.y + heli.h
  ) {
    mult = 2;
  }
}

function over1000() {
  if (distance > 1000) {
    // Change helicopter colour
    currentHeliImg = greenHeliImg;
    // Bigger Walls
    wall1.w = 85;
    wall1.h = 150;
    wall2.w = 85;
    wall2.h = 150;
    wall3.w = 85;
    wall3.h = 150;
  }
}

function over3000() {
  if (distance > 3000) {
    gameColour = "blue";
    wall1.x += -3;
    wall2.x += -3;
    wall3.x += -3;
    multiplier.x += -3;
  }
}

function checkBest() {
  if (distance > best) {
    best = distance.toFixed(0);
  }
}

function gameOver() {
  explosion.play();
  state = "gameover";
  setTimeout(reset, 2000);
  checkBest();
}

function drawGame() {
  drawMainComponents();
  drawWalls();
  drawPowerUps();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();
  drawWalls();
  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);
}
// HELPER FUNCTION
function reset() {
  state = "start";
  heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    accel: 0.7,
  };

  wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  distance = 0;

  multiplier = {
    x: cnv.width + 250,
    y: Math.random() * 300 + 100,
    w: 60,
    h: 40,
  };
  gameColour = "green";
}

function drawWalls() {
  ctx.fillStyle = gameColour;
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
}
function drawMainComponents() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = gameColour;
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText(`DISTANCE: ${distance.toFixed(0)}`, 25, cnv.height - 15);
  ctx.fillText(`BEST: ${best}`, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(currentHeliImg, heli.x, heli.y);
}

function drawPowerUps() {
  // Multiplier
  ctx.drawImage(
    multiplierImg,
    multiplier.x,
    multiplier.y,
    multiplier.w,
    multiplier.h
  );
}
