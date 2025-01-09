const mainMenu = document.getElementById('mainMenu');
const gameContainer = document.getElementById('gameContainer');
const settingsMenu = document.getElementById('settingsMenu');
const highestScoreText = document.getElementById('highestScoreText');
const highestScoreDisplay = document.getElementById('highestScore');
const birdImageInput = document.getElementById('birdImage');
const wallImageInput = document.getElementById('wallImage');
const backgroundImageInput = document.getElementById('backgroundImage'); // New
const settingsButton = document.getElementById('settingsButton');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreDisplay = document.getElementById('finalScore');

let highestScore = localStorage.getItem('highestScore') || 0;
let birdImage = 'OIG3__1_-removebg-preview.png'; // Default bird image path
let wallImage = 'walls.png'; // Default wall image path
let backgroundImageUrl = 'image.png'; // Default background image path

function resetGameState() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Hide game over screen
    gameOverScreen.style.display = 'none';
  }

  function goToMainMenu() {
    resetGameState();
    mainMenu.style.display = 'flex';
    gameContainer.style.display = 'none'; // Hide game container
    settingsMenu.style.display = 'none'; // Hide settings menu
  }

  function updateHighestScore() {
    highestScoreDisplay.textContent = highestScore;
}

  function startGame() {
    mainMenu.style.display = 'none';
    settingsMenu.style.display = 'none';
    gameContainer.style.display = 'block';
    initializeGame();
  }

  function applySettings() {
    const selectedBirdImage = birdImageInput.files[0];
    const selectedWallImage = wallImageInput.files[0];
    const selectedBackgroundImage = backgroundImageInput.files[0];
  
    if (selectedBirdImage) {
      birdImage = URL.createObjectURL(selectedBirdImage);
      localStorage.setItem('birdImage', birdImage); // Save bird image URL
    }
    if (selectedWallImage) {
      wallImage = URL.createObjectURL(selectedWallImage);
      localStorage.setItem('wallImage', wallImage); // Save wall image URL
    }
    if (selectedBackgroundImage) {
      backgroundImageUrl = URL.createObjectURL(selectedBackgroundImage);
      localStorage.setItem('backgroundImageUrl', backgroundImageUrl); // Save background image URL
    }
  
    goToMainMenu(); // Go back to main menu after applying settings
  }
  
  // Automatically set the selected images on page load if they exist in local storage
  function setSavedImages() {
    const savedBirdImage = localStorage.getItem('birdImage');
    const savedWallImage = localStorage.getItem('wallImage');
    const savedBackgroundImage = localStorage.getItem('backgroundImageUrl');
  
    if (savedBirdImage) {
      birdImage = savedBirdImage;
    }
    if (savedWallImage) {
      wallImage = savedWallImage;
    }
    if (savedBackgroundImage) {
      backgroundImageUrl = savedBackgroundImage;
    }
  }
  
  // Call the function to set saved images on page load
  setSavedImages();
  
  // Automatically show main menu when the page loads
  goToMainMenu();
  
  function openSettings() {
    settingsMenu.style.display = 'block';
    mainMenu.style.display = 'none';
  }
  
  function closeSettings() {
    settingsMenu.style.display = 'none';
    mainMenu.style.display = 'flex';
  }
  
  function playAgain() {
    gameOverScreen.style.display = 'none';
    startGame();
  }
  
  function endGame(score) {
    const finalScore = score || 0;
    if (finalScore > highestScore) {
        highestScore = finalScore;
        localStorage.setItem('highestScore', highestScore);
        updateHighestScore(); // Update highest score display
    }
    finalScoreDisplay.textContent = finalScore;
    const highestScoreElement = document.getElementById('highestScore');
    const lastScoreElement = document.getElementById('lastScore');
    highestScoreElement.textContent = highestScore;
    lastScoreElement.textContent = finalScore;

    const highestScoreText = document.getElementById('highestScoreText');
    highestScoreText.textContent = `Highest Score: ${highestScore}, Last Score: ${finalScore}`;

    gameOverScreen.style.display = 'flex';
  }

function initializeGame() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');


  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Set background image
  const backgroundImage = new Image();
  backgroundImage.onload = function() {
    // Draw background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // After drawing the background, you can draw other game elements
    // For now, let's draw a placeholder rectangle
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(50, 50, 100, 100); // Draw a white rectangle as a placeholder
  };

  // Set the source of the background image to the selected background image
  backgroundImage.src = backgroundImageUrl; // Use backgroundImageUrl instead of backgroundImage

  const bird = {
    x: 50,
    y: canvas.height / 2,
    radius: 20,
    velocity: 0,
    gravity: 0.5,
    jumpStrength: 10,
    image: new Image()
  };

  bird.image.src = birdImage;

  let walls = [];
  let score = 0;
  let isGameOver = false;

  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;

  function drawBird() {
    ctx.drawImage(bird.image, bird.x - bird.radius, bird.y - bird.radius, bird.radius * 2, bird.radius * 2);
  }

  function drawWalls() {
    walls.forEach(wall => {
      const wallImg = new Image();
      wallImg.src = wallImage;
      ctx.drawImage(wallImg, wall.x, 0, wall.width, wall.topHeight);
      ctx.drawImage(wallImg, wall.x, canvas.height - wall.bottomHeight, wall.width, wall.bottomHeight);
    });
  }

  function drawScore() {
    ctx.font = '24px Press Start 2P';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Score: ${score}`, 10, 30);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawWalls();
    drawScore();
  }

  function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
      endGame();
    }
  }

  function updateWalls() {
    walls.forEach(wall => {
      wall.x -= 2;

      if (bird.x + bird.radius > wall.x && bird.x - bird.radius < wall.x + wall.width) {
        if (bird.y - bird.radius < wall.topHeight || bird.y + bird.radius > canvas.height - wall.bottomHeight) {
          endGame();
        }
      }

      if (wall.x + wall.width < 0) {
        walls.shift();
        score++;
      }
    });
  }

  function generateWalls() {
    if (frames % 120 === 0) {
      const topHeight = Math.random() * (canvas.height / 2);
      const bottomHeight = Math.random() * (canvas.height / 2);
      walls.push({ x: canvas.width, topHeight, bottomHeight, width: 50 });
    }
  }

  function endGame() {
    isGameOver = true;
    if (score > highestScore) {
      highestScore = score;
      localStorage.setItem('highestScore', highestScore);
      highestScoreDisplay.textContent = highestScore;
    }
    finalScoreDisplay.textContent = score;
    gameOverScreen.style.display = 'flex';
  }
  
  function goToMainMenu() {
    resetGameState(); // Reset game state
    gameOverScreen.style.display = 'none';
    settingsMenu.style.display = 'none'; // Ensure settings menu is hidden
    mainMenu.style.display = 'flex';
  }
  
  function playAgain() {
    gameOverScreen.style.display = 'none';
    startGame();
  }

  let frames = 0;
  function animate() {
    if (!isGameOver) {
      frames++;
      draw();
      updateBird();
      updateWalls();
      generateWalls();
      requestAnimationFrame(animate);
    }
  }

  animate();

  canvas.addEventListener('click', () => {
    if (!isGameOver) {
      bird.velocity = -bird.jumpStrength;
    }
  });
}

settingsButton.addEventListener('click', openSettings); // Event listener for settings button

// Handle window resize for mobile
window.addEventListener('resize', () => {
    if (gameContainer.style.display === 'block') {
      const canvas = document.getElementById('gameCanvas');
      canvas.width = window.innerWidth - 20;
      canvas.height = window.innerHeight - 20;
    }
  });

  goToMainMenu();
