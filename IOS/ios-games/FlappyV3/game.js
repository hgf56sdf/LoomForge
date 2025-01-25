// Performance Optimization: Image and Resource Caching
const imageCache = {
    bird: null,
    pipe: null,
    background: null
};

// Performance Optimization: Star Generation
const starCache = [];

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bird, pipes, score, difficulty;
let gameAnimationFrame = null;

const settings = {
    birdColor: 'red',
    birdSize: 'medium',
    pipeStyle: 'normal',
    backgroundTheme: 'day',
    customBird: null,
    customPipe: null,
    customBackground: null
};

const birdSizes = {
    small: 20,
    medium: 30,
    large: 40
};

const difficultySettings = {
    easy: { gravity: 0.3, jump: -6, pipeSpeed: 1.5 },
    medium: { gravity: 0.5, jump: -8, pipeSpeed: 2 },
    hard: { gravity: 0.7, jump: -10, pipeSpeed: 2.5 }
};

function preloadImages() {
    if (settings.customBird) {
        imageCache.bird = new Image();
        imageCache.bird.src = settings.customBird;
    }
    if (settings.customPipe) {
        imageCache.pipe = new Image();
        imageCache.pipe.src = settings.customPipe;
    }
    if (settings.customBackground) {
        imageCache.background = new Image();
        imageCache.background.src = settings.customBackground;
    }
}

function generateStars() {
    starCache.length = 0;
    for (let i = 0; i < 100; i++) {
        starCache.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2
        });
    }
}

function Bird(size) {
    this.x = canvas.width / 4;
    this.y = canvas.height / 2;
    this.size = birdSizes[size];
    this.velocity = 0;
    this.gravity = difficultySettings[difficulty].gravity;
    this.jump = difficultySettings[difficulty].jump;

    this.draw = function() {
        if (settings.customBird && imageCache.bird) {
            ctx.drawImage(imageCache.bird, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        } else {
            ctx.fillStyle = settings.birdColor === 'rainbow' ? `hsl(${Date.now() % 360}, 100%, 50%)` : settings.birdColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    this.update = function() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Constrain to canvas
        this.y = Math.max(this.size / 2, Math.min(this.y, canvas.height - this.size / 2));
    };

    this.flap = function() {
        this.velocity = this.jump;
    };
}

function Pipe(x) {
    this.x = x;
    this.width = 50;
    this.gapHeight = 150;
    this.topHeight = Math.random() * (canvas.height - this.gapHeight - 100) + 50;

    this.draw = function() {
        if (settings.customPipe && imageCache.pipe) {
            ctx.drawImage(imageCache.pipe, this.x, 0, this.width, this.topHeight);
            ctx.drawImage(imageCache.pipe, this.x, this.topHeight + this.gapHeight, this.width, canvas.height - this.topHeight - this.gapHeight);
        } else {
            ctx.fillStyle = settings.pipeStyle === 'neon' ? '#39ff14' : '#2ecc71';
            ctx.fillRect(this.x, 0, this.width, this.topHeight);
            ctx.fillRect(this.x, this.topHeight + this.gapHeight, this.width, canvas.height - this.topHeight - this.gapHeight);
        }
    };

    this.update = function() {
        this.x -= difficultySettings[difficulty].pipeSpeed;
    };
}

function checkCollision(bird, pipe) {
    // Early exit for performance
    if (bird.x + bird.size / 2 < pipe.x || 
        bird.x - bird.size / 2 > pipe.x + pipe.width) {
        return false;
    }
    
    return (bird.y - bird.size / 2 < pipe.topHeight || 
            bird.y + bird.size / 2 > pipe.topHeight + pipe.gapHeight);
}

function drawStars() {
    ctx.fillStyle = '#FFFFFF';
    starCache.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawBackground() {
    if (!gameAnimationFrame) {
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
    }

    if (settings.customBackground && imageCache.background) {
        ctx.drawImage(imageCache.background, 0, 0, canvas.width, canvas.height);
    } else {
        switch (settings.backgroundTheme) {
            case 'day':
                ctx.fillStyle = '#87CEEB';
                break;
            case 'night':
                ctx.fillStyle = '#191970';
                break;
            case 'space':
                ctx.fillStyle = '#000000';
                break;
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (settings.backgroundTheme === 'space') {
            drawStars();
        }
    }
}

function drawScore() {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px "Press Start 2P"';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function updateGame() {
    if (!gameAnimationFrame) return;

    gameAnimationFrame = requestAnimationFrame(updateGame);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    bird.update();
    bird.draw();

    // Optimized pipe management
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 300) {
        if (pipes.length < 5) {
            pipes.push(new Pipe(canvas.width));
        }
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        pipes[i].draw();

        if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(i, 1);
            score++;
        }

        if (checkCollision(bird, pipes[i])) {
            gameOver();
            break;
        }
    }

    drawScore();
}

function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    bird = new Bird(settings.birdSize);
    pipes = [];
    score = 0;
    
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('difficultyScreen').style.display = 'none';
    
    canvas.addEventListener('click', () => bird.flap());
    
    if (settings.backgroundTheme === 'space') {
        generateStars();
    }
    
    gameAnimationFrame = requestAnimationFrame(updateGame);
}

function gameOver() {
    cancelAnimationFrame(gameAnimationFrame);
    gameAnimationFrame = null;
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOverScreen').style.display = 'block';
    canvas.removeEventListener('click', () => bird.flap());
    
    drawBackground();
}

function restartGame() {
    document.getElementById('gameOverScreen').style.display = 'none';
    startGame(difficulty);
}

function showMainMenu() {
    cancelAnimationFrame(gameAnimationFrame);
    gameAnimationFrame = null;
    
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('settingsMenu').style.display = 'none';
    document.getElementById('difficultyScreen').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'block';
    
    drawBackground();
}

function showSettings() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('settingsMenu').style.display = 'block';
}

function showDifficultyScreen() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('difficultyScreen').style.display = 'block';
}

function saveSettings() {
    settings.birdColor = document.getElementById('birdColor').value;
    settings.birdSize = document.getElementById('birdSize').value;
    settings.pipeStyle = document.getElementById('pipeStyle').value;
    settings.backgroundTheme = document.getElementById('backgroundTheme').value;

    const customBirdFile = document.getElementById('customBird').files[0];
    const customPipeFile = document.getElementById('customPipe').files[0];
    const customBackgroundFile = document.getElementById('customBackground').files[0];

    const handleFile = (file, settingsKey) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                settings[settingsKey] = e.target.result;
                preloadImages();
            };
            reader.readAsDataURL(file);
        }
    };

    handleFile(customBirdFile, 'customBird');
    handleFile(customPipeFile, 'customPipe');
    handleFile(customBackgroundFile, 'customBackground');

    showMainMenu();
}

// Initialize
preloadImages();
showMainMenu();
