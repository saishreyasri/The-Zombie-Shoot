// Iteration 1: Declare variables required for this game
const gameBoard = document.getElementById("game-body");
const livesDisplay = document.getElementById("lives");
let gameTime = parseInt(document.getElementById("timer").textContent);
let zombieId = 0;
const imgs = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
];
let lives = 3;

// Iteration 1.2: Add shotgun sound
const shotgunAudio = new Audio("./assets/shotgun.wav");
shotgunAudio.volume = 0.5;

// Iteration 1.3: Add background sound
const backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.volume = 0.9;
backgroundSound.loop = true;

// Iteration 1.4: Add lives
const maxLives = 3;

// Iteration 2: Write a function to make a zombie
function createZombie() {
    const zombie = document.createElement("img");
    const randomIndex = Math.floor(Math.random() * imgs.length);
    zombie.src = `./assets/${imgs[randomIndex]}`;
    zombie.classList.add("zombie-image");
    zombie.setAttribute("id", `zombie-${zombieId}`);
    gameBoard.appendChild(zombie);
    
    const randomLeft = Math.random() * (gameBoard.offsetWidth - zombie.offsetWidth);
    zombie.style.left = `${randomLeft}px`;
    
    zombie.onclick = () => {
        shotgunAudio.currentTime = 0;
        shotgunAudio.play();
        zombieKill(zombie);
    };

    zombieId++;
}

// Iteration 3: Write a function to check if the player missed a zombie
function zombieShoot(zombie) {
    return zombie.getBoundingClientRect().top <= 0;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieKill(zombie) {
    zombie.style.display = "none";
    if (zombieShoot(zombie)) {
        lives--;
        livesDisplay.textContent = lives;
    }
    if (lives <= 0) {
        clearInterval(timer);
        location.href = "./game-over.html";
    }
    if (gameTime <= 0) {
        clearInterval(timer);
        location.href = "./win.html";
    }
    createZombie();
}

// Iteration 5: Creating timer
const timer = setInterval(() => {
    gameTime--;
    document.getElementById("timer").textContent = gameTime;
    const zombies = document.querySelectorAll(".zombie-image");
    zombies.forEach(zombie => {
        if (zombieShoot(zombie)) {
            zombieKill(zombie);
        }
    });
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie
backgroundSound.play();
createZombie();

// Iteration 7: Write the helper function to get random integer
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
