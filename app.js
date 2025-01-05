let player = document.querySelector(".user");
let gameOver = document.querySelector(".game-over");
let dragon = document.querySelector(".dragon");
let score = document.querySelector(".score");
let scoreCount = 0;
var cross = true;
let audio = new Audio('assets/music.mp3');
let die = new Audio('assets/die.wav');
let jump = new Audio('assets/jump.mp3');

// Play background music after a key press
document.onkeydown = function (e) {
    if (!audio.playing) { // Check if audio is already playing
        audio.play();
    }

    if (e.keyCode == 38) {
        if (player) {
            player.classList.add("animateUser");
            jump.play();
            setTimeout(() => {
                player.classList.remove("animateUser");
            }, 700);
        } else {
            console.error("Player element not found.");
        }
    }
    if (e.keyCode == 39) {
        let playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue("left"));
        player.style.left = playerX + 112 + "px";
    }
    if (e.keyCode == 37) {
        let playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue("left"));
        player.style.left = (playerX - 112) + "px";
    }
};

// Now the background music will start after the first key press or interaction
setInterval(() => {
    let ux = parseInt(window.getComputedStyle(player, null).getPropertyValue("left"));
    let uy = parseInt(window.getComputedStyle(player, null).getPropertyValue("top"));

    let ex = parseInt(window.getComputedStyle(dragon, null).getPropertyValue("left"));
    let ey = parseInt(window.getComputedStyle(dragon, null).getPropertyValue("top"));

    let offsetX = Math.abs(ux - ex);
    let offsetY = Math.abs(uy - ey);

    if (offsetX < 170 && offsetY < 140) {
        gameOver.style.visibility = "visible";
        dragon.classList.remove("enemy");
        setTimeout(() => {
            audio.pause();
            die.play();
            player.classList.add("lose");
        }, 100);
    } else if (offsetX < 190 && cross) {
        scoreCount += 1;
        updateScore();
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        // Increase dragon speed linearly based on score
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue("animation-duration"));
            let newDur = aniDur - 0.1;
            dragon.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 100);

function updateScore() {
    score.innerText = "Your Score : " + scoreCount;
}
