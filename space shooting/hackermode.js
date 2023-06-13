// Background Music
/*
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
}









 // Move invaders
 for (let i = 0; i < invaders.length; i++) {
    const invader = invaders[i];
    invader.x += invader.stepX;
    invader.y += invader.stepY;
 }*/