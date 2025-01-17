const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bird, pipes, score, gameLoop, difficulty;
let settings = {
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

function Bird(size) {
    this.x = canvas.width / 4;
    this.y = canvas.height / 2;
    this.size = birdSizes[size];
    this.velocity = 0;
    this.gravity = difficultySettings[difficulty].gravity;
    this.jump = difficultySettings[difficulty].jump;

    this.draw = function() {
        if (settings.customBird) {
            const img = new Image();
            img.src = settings.customBird;
            ctx.drawImage(img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
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

        if (this.y + this.size / 2 > canvas.height) {
            this.y = canvas.height - this.size / 2;
            this.velocity = 0;
        }

        if (this.y - this.size / 2 < 0) {
            this.y = this.size / 2;
            this.velocity = 0;
        }
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
        if (settings.customPipe) {
            const img = new Image();
            img.src = settings.customPipe;
            ctx.drawImage(img, this.x, 0, this.width, this.topHeight);
            ctx.drawImage(img, this.x, this.topHeight + this.gapHeight, this.width, canvas.height - this.topHeight - this.gapHeight);
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

function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    bird = new Bird(settings.birdSize);
    pipes = [];
    score = 0;
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('difficultyScreen').style.display = 'none';
    gameLoop = setInterval(updateGame, 20);
    canvas.addEventListener('click', () => bird.flap());
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    bird.update();
    bird.draw();

    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        pipes.push(new Pipe(canvas.width));
    }

    pipes.forEach((pipe, index) => {
        pipe.update();
        pipe.draw();

        if (pipe.x + pipe.width < 0) {
            pipes.splice(index, 1);
            score++;
        }

        if (checkCollision(bird, pipe)) {
            gameOver();
        }
    });

    drawScore();
}

let menuBackground = '#2c3e50';

function drawBackground() {
    if (gameLoop) {
        // This is during gameplay
        if (settings.customBackground) {
            const img = new Image();
            img.src = settings.customBackground;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        } else {
            switch (settings.backgroundTheme) {
                case 'day':
                    ctx.fillStyle = '#87CEEB';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    break;
                case 'night':
                    ctx.fillStyle = '#191970';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    break;
                case 'space':
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    drawStars();
                    break;
            }
        }
    } else {
        // This is for menus
        ctx.fillStyle = menuBackground;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function drawStars() {
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawScore() {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px "Press Start 2P"';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function checkCollision(bird, pipe) {
    return (
        bird.x + bird.size / 2 > pipe.x &&
        bird.x - bird.size / 2 < pipe.x + pipe.width &&
        (bird.y - bird.size / 2 < pipe.topHeight || bird.y + bird.size / 2 > pipe.topHeight + pipe.gapHeight)
    );
}

function gameOver() {
    clearInterval(gameLoop);
    gameLoop = null;
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
    clearInterval(gameLoop);
    gameLoop = null;
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

    if (customBirdFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            settings.customBird = e.target.result;
        };
        reader.readAsDataURL(customBirdFile);
    }

    if (customPipeFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            settings.customPipe = e.target.result;
        };
        reader.readAsDataURL(customPipeFile);
    }

    if (customBackgroundFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            settings.customBackground = e.target.result;
        };
        reader.readAsDataURL(customBackgroundFile);
    }

    showMainMenu();
}

function drawMenuBackground() {
    if (!gameLoop) {
        drawBackground();
        requestAnimationFrame(drawMenuBackground);
    }
}

// Initialize the game
showMainMenu();
drawMenuBackground();

