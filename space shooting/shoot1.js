// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// Background Music
const backgroundMusic = new Audio("SOUND.mp3");
backgroundMusic.loop = true;

// Function to play background music
function playBackgroundMusic() {
  backgroundMusic.play();
}

// Function to pause background music
function pauseBackgroundMusic() {
  backgroundMusic.pause();
}

// Function to stop background music
function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

// Keyboard event listener to toggle background music
document.addEventListener("keydown", function (event) {
  if (event.key === "m") {
    if (backgroundMusic.paused) {
      playBackgroundMusic();
    } else {
      pauseBackgroundMusic();
    }
  }
});



// Player
const playerWidth = 50;
const playerHeight = 50;
let playerX = (canvas.width - playerWidth) / 2-50;
let playerY = canvas.height - playerHeight - 10;
const playerStep = 5;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;


//BASE SHOOTER
const baseWidth=30;
const baseHeight=70;
let baseX=canvas.width/2-baseWidth+65;
let baseY=canvas.height/2-baseHeight+200;


//homebase

let homeX=canvas.width/2;
let homeY=canvas.height/2+200;



let health = 100; // Player health
const maxHealth = 100; // Maximum health value

// Bullet
const bulletWidth = 5;
const bulletHeight = 15;
let bulletX = 0;
let bulletY = 0;
const bulletStep = 30;
let bulletStepX = 0;
let bulletStepY = 0;
let bulletVisible = false;

// Invaders
const invaderWidth = 50;
const invaderHeight = 50;
const maxInvaders = 5;
let invaders = [];

// Bullets fired by invaders
const invaderBulletWidth = 5;
const invaderBulletHeight = 15;
const invaderBulletStep = 5;
let invaderBullets = [];

// Score
let score = 0;

//



//POWER UP FEATURE

class PowerUp {
  constructor(x, y, type, duration) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.type = type;
    this.duration = duration;
  }
}

const powerUps = [];

function createPowerUp() {
  const x = Math.random() * (canvas.width - 20);
  const y = Math.random() * (canvas.height - 20);
  const type = 'rapidFire';
  const duration = 10000; // 10 seconds

  const powerUp = new PowerUp(x, y, type, duration);
  powerUps.push(powerUp);
}

let rapidFire = false;
let rapidFireTimer = 0;

function applyPowerUpEffect() {
  rapidFire = true;
  rapidFireTimer = powerUp.duration;

  
}

function update(deltaTime) {
  // Update player position

  // Check collision between player and power-ups
  powerUps.forEach((powerUp, index) => {
    if (
      player.x < powerUp.x + powerUp.width &&
      player.x + player.width > powerUp.x &&
      player.y < powerUp.y + powerUp.height &&
      player.y + player.height > powerUp.y
    ) {
      // Power-up collected
      applyPowerUpEffect();
      powerUps.splice(index, 1); // Remove power-up from the array
    }
  });

  // Update power-up timers
  if (rapidFire) {
    rapidFireTimer -= deltaTime;

    if (rapidFireTimer <= 0) {
      // Rapid fire effect expired
      rapidFire = false;

      // Additional logic to revert bullet firing rate to normal
    }
  }

  // Update bullet positions and collision with enemies
}
function renderPowerUps() {
  powerUps.forEach(powerUp => {
    context.fillStyle = 'green';
    context.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
  });
}

function render() {
 
  renderPowerUps();

}




// Keyboard event listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
  if (event.key === "ArrowLeft") {
    leftPressed = true;
  } else if (event.key === "ArrowRight") {
    rightPressed = true;
  } else if (event.key === "ArrowUp") {
    upPressed = true;
  } else if (event.key === "ArrowDown") {
    downPressed = true;
    
  } 
  else if(event.key=="w"){
    if(!bulletVisible){
      bulletX=baseX+playerWidth/2 - bulletWidth/2;
       bulletY=baseY;
       bulletStepX=0;
       bulletY=-bulletStep;
       bulletVisible=true;

    }
  }
    else if (event.key === " ") {
    if (!bulletVisible) {
      bulletX = playerX + playerWidth / 2 - bulletWidth / 2;
      bulletY = playerY;
      bulletStepX = 0;
      bulletStepY = -bulletStep;
      bulletVisible = true;
    }
  }
}

function keyUpHandler(event) {
  if (event.key === "ArrowLeft") {
    leftPressed = false;
  } else if (event.key === "ArrowRight") {
    rightPressed = false;
  } else if (event.key === "ArrowUp") {
    upPressed = false;
  } else if (event.key === "ArrowDown") {
    downPressed = false;
  }
}

// Function to spawn a new invader
function spawnInvader() {
  const invader = {
    x: Math.random() * (canvas.width - invaderWidth),
    y: -invaderHeight,
    visible: true,
    stepX: Math.random() > 0.5 ? 2 : -2, // Randomly set horizontal direction
    stepY: 2,
  };

  invaders.push(invader);

  if (invaders.length > maxInvaders) {
    invaders.shift();
  }
}

// Function to spawn an invader bullet
function spawnInvaderBullet(invader) {
  const invaderBullet = {
    x: invader.x + invaderWidth / 2 - invaderBulletWidth / 2,
    y: invader.y + invaderHeight,
  };

  invaderBullets.push(invaderBullet);
}

// Interval function to spawn invaders
setInterval(spawnInvader, 2000);


//to store score in the leaderboard section

let leaderboard = []; // Array to store player scores

// Function to update the leaderboard
function updateLeaderboard(score) {
  leaderboard.push(score);
  leaderboard.sort((a, b) => b - a); // Sort scores in descending order
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  
}
const storedLeaderboard = localStorage.getItem('leaderboard');
if (storedLeaderboard) {
  leaderboard = JSON.parse(storedLeaderboard);
}

// Function to display the leaderboard
function displayLeaderboard() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("LEADERBOARD", 1300, 30);
  ctx.fillText("-----------", 1300, 50);
  
  for (let i = 0; i < leaderboard.length; i++) {
    ctx.fillText(`${i + 1}. ${leaderboard[i]}`,1300, 90 + i * 30);
  }
}
 
function gameOver(){
  updateLeaderboard(score);
}



// Function to update game state
function update() {
  // Move player
  if (leftPressed && playerX > 0) {
    playerX -= playerStep;
  }
  if (rightPressed && playerX < canvas.width - playerWidth) {
    playerX += playerStep;
  }
  if (upPressed && playerY > 0) {
    playerY -= playerStep;
  }
  if (downPressed && playerY < canvas.height - playerHeight) {
    playerY += playerStep;
  }

  // Move bullet
  if (bulletVisible) {
    bulletX += bulletStepX;
    bulletY += bulletStepY;

    // Check if bullet is out of bounds
    if (bulletY < 0) {
      bulletVisible = false;
    }
  }

  // Move invaders
  for (let i = 0; i < invaders.length; i++) {
    const invader = invaders[i];
    invader.x += invader.stepX;
    invader.y += invader.stepY;

    // Check for collision with player
    if (
      invader.y + invaderHeight >= playerY &&
      invader.y <= playerY + playerHeight &&
      invader.x + invaderWidth >= playerX &&
      invader.x <= playerX + playerWidth
    ) {
      health--; 
    if (health <= 0) {
      //gameOver();
    location.reload();

        
      }
    }

    // Check for collision with bullet
    if (
      bulletVisible &&
      invader.visible &&
      bulletY <= invader.y + invaderHeight &&
      bulletY + bulletHeight >= invader.y &&
      bulletX + bulletWidth >= invader.x &&
      bulletX <= invader.x + invaderWidth
    ) {
      invader.visible = false;
      bulletVisible = false;
      score++; // Increase score
    }

    // Remove invader if it goes off the screen
    if (invader.y > canvas.height) {
      invaders.splice(i, 1);
      i--;
    }

    // Randomly fire invader bullets
    if (Math.random() < 0.01) {
      spawnInvaderBullet(invader);
    }
  }

  // Move invader bullets
  for (let i = 0; i < invaderBullets.length; i++) {
    const invaderBullet = invaderBullets[i];
    invaderBullet.y += invaderBulletStep;

    // Check for collision with player
    if (
      invaderBullet.y + invaderBulletHeight >= playerY &&
      invaderBullet.y <= playerY + playerHeight &&
      invaderBullet.x + invaderBulletWidth >= playerX &&
      invaderBullet.x <= playerX + playerWidth
    ) {
      health-=10;
      invaderBullets.splice(i, 1);
      i--;
      if (health <= 0) {
        gameOver();
        
        
        location.reload();

      }
    }
    

    // Remove invader bullet if it goes off the screen
    if (invaderBullet.y > canvas.height) {
      invaderBullets.splice(i, 1);
      i--;
    }
  }


}


// Function to draw the player
function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(playerX + playerWidth / 2, playerY);
  ctx.lineTo(playerX, playerY + playerHeight);
  ctx.lineTo(playerX + playerWidth, playerY + playerHeight);
  ctx.closePath();
  ctx.fill();
}


// Function to draw the health bar
function drawHearts() {
  const healthBarWidth = 150;
  const healthBarHeight = 20;
  const healthBarX = canvas.width / 2 -510;
  const healthBarY = canvas.height - 690;

  // Calculate the width of the health bar based on the player's health
  const currentHealthWidth = (health / maxHealth) * healthBarWidth;

  // Draw the background of the health bar
  ctx.fillStyle = "gray";
  ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

  // Draw the current health level
  ctx.fillStyle = "red";
  ctx.fillRect(healthBarX, healthBarY, currentHealthWidth, healthBarHeight);
  //text form of health
  ctx.fillStyle='white';
  ctx.font = "20px Arial";
  ctx.fillText("Heath: " + health, 100, 30);

}

//Function to drwa the base
function home(){
ctx.fillStyle='yellow';
ctx.fillRect(homeX,homeY,100,40);
}



// Function to draw the bullet
function drawBullet() {
  if (bulletVisible) {
    ctx.fillStyle = "red";
    ctx.fillRect(bulletX, bulletY, bulletWidth, bulletHeight);
  }
}

// Function to draw the invaders
function drawInvaders() {
  ctx.fillStyle = "green";
  for (let i = 0; i < invaders.length; i++) {
    const invader = invaders[i];
    if (invader.visible) {
      ctx.fillRect(invader.x, invader.y, invaderWidth, invaderHeight);
    }
  }
}

function drawbase(){
  ctx.fillstyle="white";
  ctx.fillRect(baseX,baseY,30,70);                     

}
// Function to draw invader bullets
function drawInvaderBullets() {
  ctx.fillStyle = "orange";
  for (let i = 0; i < invaderBullets.length; i++) {
    const invaderBullet = invaderBullets[i];
    ctx.fillRect(invaderBullet.x, invaderBullet.y, invaderBulletWidth, invaderBulletHeight);
  }
}

// Function to draw the score
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}
  


// Game loop
function gameLoop() {
  ctx.fillStyle='black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  update();
  drawPlayer();
  drawBullet();
  drawInvaders();
  drawInvaderBullets();
  drawScore();
  drawHearts();
  home();
  //pauseBackgroundMusic();
  //stopBackgroundMusic();
  playBackgroundMusic();
  displayLeaderboard();
  //updateleaderBoard(score);
  render();
drawbase();
  
  requestAnimationFrame(gameLoop);
}

gameLoop();
