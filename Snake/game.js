window.onload = function() {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    document.getElementById('restartGameBtn').style.display = "none";

    class SnakePart {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    // Game Settings
    let gameSpeed = 7;
    let tileCount = 20;
    let tileSize = canvas.width / tileCount - 2
    let headX = 10;
    let headY = 10;
    const snakeParts = [];
    let tailLength = 2;

    let appleX = 5;
    let appleY = 5;

    let xVelocity = 0;
    let yVelocity = 0;

    let score = 0;

    // Game Loop
    function draw() {
        changeSnakePos();

        let result = isGameOver();
        if (result) {
            return;
        }

        clearScreen();
        checkAppleCollision();
        drawApple();
        drawSnake();
        drawScore();

        if (score > 2) {
            gameSpeed = 11;
        }
        if (score > 5) {
            gameSpeed = 15;
        }
        setTimeout(draw, 1000 / gameSpeed);
    }

    function isGameOver() {
        let gameOver = false;

        if (xVelocity === 0 && yVelocity === 0) {
            return false;
        }

        if (headX < 0) {
            gameOver = true;
        }
        else if (headX === tileCount) {
            gameOver = true;
        }
        else if (headY < 0) {
            gameOver = true;
        }
        else if (headY === tileCount) {
            gameOver = true;
        }

        for (let i = 0; i < snakeParts.length; i++) {
            let part = snakeParts[i];
            if (part.x === headX && part.y === headY) {
                gameOver = true;
                break;
            }
        }

        if (gameOver) {
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";

            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", " magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // Fill with gradient
            ctx.fillStyle = gradient;

            ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
            document.getElementById('restartGameBtn').style.display = "block";
        }

        return gameOver;
    }

    function drawScore() {
        ctx.fillStyle = 'white';
        ctx.font = '10px Verdana';
        ctx.fillText("Score " + score, canvas.width - 50, 10);
    }

    function clearScreen() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    function restartGame() {
        window.location.reload();
    }

    function drawSnake() {
        ctx.fillStyle = 'green';
        for (let i = 0; i < snakeParts.length; i++) {
            let part = snakeParts[i];
            ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
        }

        snakeParts.push(new SnakePart(headX, headY)); // Add an item at the end of the list where the heads position last was.
        while (snakeParts.length > tailLength) {
            snakeParts.shift(); // Remove the furthest item from the snake parts list.
        }

        ctx.fillStyle = 'orange';
        ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    }

    function changeSnakePos() {
        headX = headX + xVelocity;
        headY = headY + yVelocity;
    }

    function drawApple() {
        ctx.fillStyle = 'red';
        ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
    }

    function checkAppleCollision() {
        if (appleX == headX && appleY == headY) {
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
            tailLength++;
            score++;
        }
    }

    // Key event listener.
    document.body.addEventListener('keydown', function(e) {
        // Up
        if (e.key === 'W') {
            if (yVelocity == 1)
                return;
            yVelocity = -1;
            xVelocity = 0;
        }

        // Down
        if (e.key === 'S') {
            if (yVelocity == -1)
                return;
            yVelocity = 1;
            xVelocity = 0;
        }

        // Left
        if (e.key === 'A') {
            if (xVelocity == 1)
                return;
            yVelocity = 0;
            xVelocity = -1;
        }

        // Right
        if (e.key === 'D') {
            if (xVelocity == -1)
                return;
            yVelocity = 0;
            xVelocity = 1;
        }
    });

    draw();
};