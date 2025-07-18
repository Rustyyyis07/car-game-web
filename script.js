const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = {
  x: 175,
  y: 500,
  width: 50,
  height: 80,
  speed: 5
};

let enemy = {
  x: Math.random() * 350,
  y: -100,
  width: 50,
  height: 80,
  speed: 3
};

let score = 0;
let gameOver = false;

function drawCar(obj, color) {
  ctx.fillStyle = color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function moveEnemy() {
  enemy.y += enemy.speed;
  if (enemy.y > 600) {
    enemy.y = -100;
    enemy.x = Math.random() * 350;
    score++;
    enemy.speed += 0.2;
  }
}

function checkCollision() {
  if (
    car.x < enemy.x + enemy.width &&
    car.x + car.width > enemy.x &&
    car.y < enemy.y + enemy.height &&
    car.y + car.height > enemy.y
  ) {
    gameOver = true;
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", 100, 300);
    return;
  }

  ctx.clearRect(0, 0, 400, 600);
  drawCar(car, "blue");
  drawCar(enemy, "red");
  moveEnemy();
  checkCollision();
  drawScore();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && car.x > 0) {
    car.x -= car.speed;
  } else if (e.key === "ArrowRight" && car.x < 350) {
    car.x += car.speed;
  }
});

gameLoop();
