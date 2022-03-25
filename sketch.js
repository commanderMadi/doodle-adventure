/*

The Game Project 5 - Bring it all together

*/

let gameChar_x;
let gameChar_y;
let floorPos_y;
let scrollPos;
let gameChar_world_x;
let charHead;

let gameHasStarted;
let gameHasEnded;
let isLeft;
let isRight;
let isFalling;
let isPlummeting;

let trees_x;

let mountains;

let collectables;

let canyons;

let clouds;

let game_score;

let flagPole;

let player;

let fallSound;
let backgroundMusic;
let winningSound;
let jumpSound;
let grabCoinSound;
let gameOverSound;

function preload() {
  soundFormats('mp3', 'wav', 'ogg');
  backgroundMusic = loadSound('assets/backgroundMusic');
  charHead = loadImage('assets/charhead.jpg');
}

function setup() {
  createCanvas(1024, 576);
  soundFormats('mp3', 'wav', 'ogg');
  fallSound = loadSound('assets/falling');
  jumpSound = loadSound('assets/jump');
  grabCoinSound = loadSound('assets/grabCoin');
  gameOverSound = loadSound('assets/gameOver');
  winningSound = loadSound('assets/winningSound');
  floorPos_y = (height * 3) / 4;
  gameChar_x = 75;
  gameChar_y = floorPos_y;

  clouds = [
    {
      x: 150,
      y: 55,
    },
    {
      x: 400,
      y: 70,
    },
    {
      x: 700,
      y: 60,
    },
    {
      x: 900,
      y: 60,
    },
    {
      x: 1100,
      y: 60,
    },
    {
      x: 1300,
      y: 40,
    },
    {
      x: 1415,
      y: 72,
    },
    {
      x: 1415,
      y: 72,
    },
    {
      x: 1415,
      y: 67,
    },
    {
      x: 1500,
      y: 55,
    },
    {
      x: 1600,
      y: 51,
    },
    {
      x: 2000,
      y: 45,
    },
    {
      x: 2500,
      y: 45,
    },
    {
      x: 2900,
      y: 74,
    },
  ];

  trees_x = [600, 750, 900, 950, 1400, 1558, 1844, 2311, 2507, 2933];

  collectables = [
    {
      isFound: false,
      item_x: 580,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },
    {
      isFound: false,
      item_x: 820,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },

    {
      isFound: false,
      item_x: 870,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },
    {
      isFound: false,
      item_x: 900,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },
    {
      isFound: false,
      item_x: 930,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },
    {
      isFound: false,
      item_x: 1100,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },
    {
      isFound: false,
      item_x: 1355,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },
    {
      isFound: false,
      item_x: 1488,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },
    {
      isFound: false,
      item_x: 1655,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },
    {
      isFound: false,
      item_x: 2050,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },
    {
      isFound: false,
      item_x: 2750,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },
    {
      isFound: false,
      item_x: 2800,
      item_y: floorPos_y,
      width: 30,
      height: 30,
    },
  ];

  mountains = [
    {
      x1: 5,
      y1: floorPos_y + 3,
      x2: 150,
      y2: 105,
      x3: 300,
      y3: floorPos_y + 3,
    },
    {
      x1: 350,
      y1: floorPos_y + 3,
      x2: 500,
      y2: 105,
      x3: 700,
      y3: floorPos_y + 3,
    },
    {
      x1: 900,
      y1: floorPos_y + 3,
      x2: 1050,
      y2: 105,
      x3: 1250,
      y3: floorPos_y + 3,
    },

    { x1: 1400, y1: floorPos_y + 3, x2: 1600, y2: 105, x3: 1800, y3: floorPos_y + 3 },

    {
      x1: 1900,
      y1: floorPos_y + 3,
      x2: 2100,
      y2: 105,
      x3: 2300,
      y3: floorPos_y + 3,
    },

    {
      x1: 2500,
      y1: floorPos_y + 3,
      x2: 2700,
      y2: 105,
      x3: 2900,
      y3: floorPos_y + 3,
    },
  ];

  canyons = [
    {
      x: 355,
      y: floorPos_y,
      width: 85,
    },
    {
      x: 670,
      y: floorPos_y,
      width: 70,
    },
    {
      x: 1200,
      y: floorPos_y,
      width: 100,
    },
    {
      x: 1499,
      y: floorPos_y,
      width: 100,
    },
    {
      x: 1780,
      y: floorPos_y,
      width: 100,
    },
    {
      x: 2300,
      y: floorPos_y,
      width: 100,
    },
    {
      x: 2655,
      y: floorPos_y,
      width: 100,
    },
    {
      x: 2955,
      y: floorPos_y,
      width: 90,
    },
  ];

  game_score = 0;

  player = {
    lives: 3,
    hasDied: false,
  };

  flagPole = {
    x: 3200,
    y: 100,
    width: 5,
    isReached: false,
  };

  // Variable to control the background scrolling.
  scrollPos = 0;

  // Variable to store the real position of the gameChar in the game
  // world. Needed for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;

  // Boolean variables to control the movement of the game character.
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
}
// Initialise arrays of scenery objects.

function draw() {
  if (gameHasStarted) {
    backgroundMusic.playMode('untilDone');
    backgroundMusic.play();
  } else if (!gameHasStarted) {
    backgroundMusic.stop();
  }

  background(100, 155, 255); // fill the sky blue

  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y); // draw some green ground

  push();
  translate(scrollPos, 0);

  // Draw clouds.
  drawClouds();

  // Draw mountains.
  drawMountains();

  // Draw trees.
  drawTrees();

  // Draw canyons.
  for (let i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
    checkCanyon(canyons[i]);
  }

  // Draw collectable items.
  for (let i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      drawCollectable(collectables[i]);
      checkCollectable(collectables[i]);
    }
  }

  //draw and check flagpole
  drawFlagPole();
  checkFlagPole();

  pop();
  noStroke();

  // Draw Lives
  fill(255, 0, 0);
  drawLives();

  //check if game modal should popup
  checkGameModal();

  // Draw game character.
  drawGameChar();

  // Draw score board.
  drawScoreBoard();

  // Logic to make the game character move or the background scroll.
  if (!gameHasStarted && player.lives > 0 && !gameHasEnded) {
    disableMovement();
    drawStageBegin('Press Enter to Start Playing');
  } else {
    if (isLeft) {
      if (gameChar_x > width * 0.2) {
        gameChar_x -= 5;
      } else {
        scrollPos += 5;
      }
    }

    if (isRight) {
      if (gameChar_x < width * 0.8) {
        gameChar_x += 5;
      } else {
        scrollPos -= 5; // negative for moving against the background
      }
    }

    // Logic to make the game character rise and fall.
    if (gameChar_y < floorPos_y) {
      gameChar_y += 2;
      isFalling = true;
    } else {
      isFalling = false;
    }
    if (isPlummeting) {
      gameChar_y += 5;
      isLeft = false;
      isRight = false;
      fallSound.playMode('untilDone');
      if (gameChar_y >= floorPos_y && gameChar_y < 500) {
        fallSound.play();
      }
    }
  }

  // Update real position of gameChar for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  if ((keyCode === 37 || keyCode === 65) && !isPlummeting) {
    isLeft = true;
  } else if ((keyCode === 39 || keyCode === 68) && !isPlummeting) {
    isRight = true;
  } else if (keyCode === 32 && !isFalling && !isPlummeting && gameHasStarted) {
    gameChar_y -= 100;
    jumpSound.playMode('untilDone');
    jumpSound.play();
  }
}

function keyReleased() {
  if (keyCode === 37 || keyCode === 65) {
    isLeft = false;
  } else if (keyCode === 39 || keyCode === 68) {
    isRight = false;
  } else if (keyCode === 13 && player.lives === 3) {
    gameHasStarted = true;
  }
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar() {
  // draw game character
  //Jumping to the left
  if (isLeft && isFalling && gameHasStarted) {
    //head code
    image(charHead, gameChar_x - 25, gameChar_y - 95, 50, 50);

    // fill('white');
    // ellipse(gameChar_x, gameChar_y - 60, 25, 25);

    //torso code
    fill('red');
    rect(gameChar_x - 15, gameChar_y - 50, 30, 30);
    fill('white');

    //arms code (right then left)
    rect(gameChar_x + 5, gameChar_y - 60, 8, 15);
    rect(gameChar_x - 23, gameChar_y - 60, 8, 15);

    // legs code (right then left)
    rect(gameChar_x + 7, gameChar_y - 20, 8, 15);
    rect(gameChar_x - 15, gameChar_y - 20, 8, 15);
  }
  //Jumping right
  else if (isRight && isFalling && gameHasStarted) {
    //head code
    image(charHead, gameChar_x - 25, gameChar_y - 95, 50, 50);

    // fill('white');
    // ellipse(gameChar_x, gameChar_y - 60, 25, 25);

    //torso code
    fill('red');
    rect(gameChar_x - 15, gameChar_y - 50, 30, 30);
    fill('white');

    //arms code (right then left)
    rect(gameChar_x + 15, gameChar_y - 60, 8, 15);
    rect(gameChar_x - 13, gameChar_y - 60, 8, 15);

    // legs code (right then left)
    rect(gameChar_x + 7, gameChar_y - 20, 8, 15);
    rect(gameChar_x - 15, gameChar_y - 20, 8, 15);
  }

  //Walking, turned left
  else if (isLeft && gameHasStarted) {
    //head code
    image(charHead, gameChar_x - 25, gameChar_y - 95, 50, 50);

    // fill('white');
    // ellipse(gameChar_x, gameChar_y - 60, 25, 25);

    //torso code
    fill('red');
    rect(gameChar_x - 15, gameChar_y - 50, 30, 30);
    fill('white');

    //arms code (right then left)
    rect(gameChar_x - 25, gameChar_y - 40, 20, 8);
    rect(gameChar_x - 25, gameChar_y - 50, 20, 8);

    // legs code (right then left)
    rect(gameChar_x + 7, gameChar_y - 20, 8, 20);
    rect(gameChar_x - 15, gameChar_y - 20, 8, 20);
  }
  //Walking, turned right
  else if (isRight && gameHasStarted) {
    //head code
    image(charHead, gameChar_x - 25, gameChar_y - 95, 50, 50);

    // fill('white');
    // ellipse(gameChar_x, gameChar_y - 60, 25, 25);

    //torso code
    fill('red');
    rect(gameChar_x - 15, gameChar_y - 50, 30, 30);
    fill('white');

    //arms code (right then left)
    rect(gameChar_x + 5, gameChar_y - 40, 20, 8);
    rect(gameChar_x + 5, gameChar_y - 50, 20, 8);

    // legs code (right then left)
    rect(gameChar_x + 7, gameChar_y - 20, 8, 20);
    rect(gameChar_x - 15, gameChar_y - 20, 8, 20);
  }
  //Jumping facing forwards
  else if (isFalling || isPlummeting) {
    //head code
    image(charHead, gameChar_x - 25, gameChar_y - 95, 50, 50);

    // fill('white');
    // ellipse(gameChar_x, gameChar_y - 60, 25, 25);

    //torso code
    fill('red');
    rect(gameChar_x - 15, gameChar_y - 50, 30, 30);
    fill('white');

    //arms code (right then left)
    rect(gameChar_x + 15, gameChar_y - 60, 8, 15);
    rect(gameChar_x - 23, gameChar_y - 60, 8, 15);

    // legs code (right then left)
    rect(gameChar_x + 7, gameChar_y - 20, 8, 15);
    rect(gameChar_x - 15, gameChar_y - 20, 8, 15);
  }

  //Standing, facing frontwards
  else {
    //head code
    image(charHead, gameChar_x - 25, gameChar_y - 95, 50, 50);
    // fill('white');
    // ellipse(gameChar_x, gameChar_y - 60, 25, 25);

    //torso code
    fill('red');
    rect(gameChar_x - 15, gameChar_y - 50, 30, 30);
    fill('white');

    //arms code (right then left)
    rect(gameChar_x + 15, gameChar_y - 50, 8, 15);
    rect(gameChar_x - 23, gameChar_y - 50, 8, 15);

    // legs code (right then left)
    rect(gameChar_x + 7, gameChar_y - 20, 8, 20);
    rect(gameChar_x - 15, gameChar_y - 20, 8, 20);
  }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds() {
  for (let i = 0; i < clouds.length; i++) {
    fill(255, 255, 255);
    // anchor point
    ellipse(clouds[i].x, clouds[i].y, 100, 100);
    // extra cloud details on left and right
    ellipse(clouds[i].x - 50, clouds[i].y, 80, 80);
    ellipse(clouds[i].x + 50, clouds[i].y, 80, 80);
  }
}

// Function to draw mountains objects.
function drawMountains() {
  for (let i = 0; i < mountains.length; i++) {
    fill(105, 69, 59);
    triangle(mountains[i].x1, mountains[i].y1, mountains[i].x2, mountains[i].y2, mountains[i].x3, mountains[i].y3);
  }
}

// Function to draw trees objects.
function drawTrees() {
  for (let i = 0; i < trees_x.length; i++) {
    // tree trunk
    fill(139, 69, 19);
    rect(trees_x[i], 300, 30, 133);

    // tree leaves
    fill(0, 150, 0);
    // tree anchor point
    ellipse(trees_x[i], 290, 80, 80);
    // extra tree details on left and right
    ellipse(trees_x[i] + 30, 250, 80, 80);
    ellipse(trees_x[i] + 50, 290, 80, 80);
    ellipse(trees_x[i] + 70, 250, 80, 80);
  }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon) {
  fill(61, 70, 107);
  rect(t_canyon.x, t_canyon.y, t_canyon.width, height - floorPos_y);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon) {
  if (gameChar_world_x > t_canyon.x && gameChar_world_x < t_canyon.x + t_canyon.width - 15 && gameChar_y >= floorPos_y) {
    isPlummeting = true;
    player.hasDied = true;
    spawnPlayer(t_canyon);
  }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable) {
  fill(255, 255, 15);
  ellipse(t_collectable.item_x, t_collectable.item_y, t_collectable.width, t_collectable.height);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable) {
  let distance = dist(gameChar_world_x, gameChar_y, t_collectable.item_x, t_collectable.item_y);
  if (distance <= t_collectable.width) {
    t_collectable.isFound = true;
    game_score++;
    grabCoinSound.play();
  }
}

function drawScoreBoard() {
  fill(241, 11, 141);
  textSize(23);
  text(`Score: ${game_score}`, 2, 20);
}

function drawFlagPole() {
  fill(255, 255, 255);
  rect(flagPole.x, flagPole.y, flagPole.width + 3, 333);
  fill(137, 207, 240);

  if (flagPole.isReached) {
    rect(flagPole.x, flagPole.y, 100, 75);
  } else {
    rect(flagPole.x, floorPos_y - flagPole.y + 30, 100, 75);
  }
}

// helper function to draw a heart from p5 official website
// https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function spawnPlayer(t_canyon) {
  if (player.lives > 0 && gameChar_y >= 630 && player.hasDied) {
    if (t_canyon.x > 800) {
      gameChar_x = t_canyon.x + scrollPos - 40;
    } else {
      gameChar_x = t_canyon.x - 40;
    }
    player.lives--;

    gameChar_y = floorPos_y;
    player.hasDied = false;
    isPlummeting = false;
  }
}

function drawStageBegin(prompt) {
  stroke('#6A5ACD');
  fill(0, 0, 128);
  textSize(36);
  text(prompt, 300, 180);
}

function drawLives() {
  if (player.lives === 3) {
    for (let i = 0; i < 3; i++) {
      heart(10 + i * 20, 30, 10);
    }
  } else if (player.lives === 2) {
    for (let i = 0; i < 2; i++) {
      heart(10 + i * 20, 30, 10);
    }
  } else if (player.lives === 1) {
    heart(10, 30, 10);
  }
}

function checkFlagPole() {
  if (abs(gameChar_world_x - flagPole.x) <= 20) {
    flagPole.isReached = true;
  }
}

function drawGameModal() {
  stroke(255, 255, 255);
  fill(0, 0, 0, 90);
  rect(380, 200, 300, 100);
  fill(255, 255, 255);
  textSize(20);
}

function disableMovement() {
  isLeft = false;
  isRight = false;
}

function checkGameModal() {
  if (gameIsOver()) {
    drawGameModal();
    setTimeout(() => {
      gameOverSound.stop(), noLoop();
    }, 2500);
    text('Game Over', 480, 250);
  } else if (gameIsCompleted()) {
    setTimeout(() => {
      winningSound.stop(), noLoop();
    }, 2500);

    drawGameModal();
    text('Level Complete', 460, 250);
  }
}

function gameIsOver() {
  if (player.lives < 1) {
    gameHasStarted = false;
    gameHasEnded = true;
    disableMovement();
    gameOverSound.playMode('untilDone');
    gameOverSound.play();
    return true;
  }
  return false;
}

function gameIsCompleted() {
  if (flagPole.isReached) {
    gameHasStarted = false;
    gameHasEnded = true;
    winningSound.playMode('untilDone');
    winningSound.play();
    disableMovement();
    return true;
  }
  return false;
}
