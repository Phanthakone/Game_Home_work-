const human = document.getElementById("human");
const snowman = document.getElementById("snowman");
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");

const STEP = 100;
const MAX = document.getElementById("game").offsetWidth - 100;
const HUMAN_TIME = 150;
const SNOWMAN_TIME = 200;

let humanX = 800;
let humanY = 500;
let snowmanX = 100;
let snowmanY = 100;

let gameOver = false;
let chaseTimer = null;

human.style.position = "absolute";
human.style.transition =
  "left " + HUMAN_TIME + "ms ease, top " + HUMAN_TIME + "ms ease";

snowman.style.position = "absolute";
snowman.style.transition =
  "left " + SNOWMAN_TIME + "ms linear, top " + SNOWMAN_TIME + "ms linear";

function draw() {
  human.style.left = humanX + "px";
  human.style.top = humanY + "px";
  snowman.style.left = snowmanX + "px";
  snowman.style.top = snowmanY + "px";
}
draw();

// ===== ຮູບຜີ Jump Scare ແບບເຕັມຈໍ =====
const overImage = document.createElement("img");
overImage.src = "img/images (1).jpeg"; // เปลี่ยนเป็นชื่อไฟล์รูปของคุณ
overImage.style.position = "fixed";
overImage.style.top = "0";
overImage.style.left = "0";
overImage.style.width = "100vw";
overImage.style.height = "100vh";
overImage.style.objectFit = "cover";
overImage.style.transform = "scale(0)";
overImage.style.transformOrigin = "center center";
overImage.style.zIndex = "9999";
overImage.style.transition = "transform 150ms ease-out";
overImage.style.display = "none";
document.body.appendChild(overImage);

function isCaught() {
  return humanX === snowmanX && humanY === snowmanY;
}

function endGame() {
  gameOver = true;
  clearInterval(chaseTimer);

  overImage.style.display = "block";

  requestAnimationFrame(() => {
    overImage.style.transform = "scale(1.1)";
    setTimeout(() => {
      overImage.style.transform = "scale(1)";
    }, 150);
  });
}

// ===== snowman ໄລ່ຕາມອັດຕະໂນມັດ =====
function chase() {
  if (gameOver) return;

  const dx = humanX - snowmanX;
  const dy = humanY - snowmanY;

  if (Math.abs(dx) >= Math.abs(dy)) {
    snowmanX += dx > 0 ? STEP : dx < 0 ? -STEP : 0;
  } else {
    snowmanY += dy > 0 ? STEP : -STEP;
  }
  draw();

  if (isCaught()) endGame();
}

chaseTimer = setInterval(chase, SNOWMAN_TIME);

// ===== human ຂະຍັບ =====
function moveHuman(dx, dy) {
  if (gameOver) return;

  const newX = humanX + dx;
  const newY = humanY + dy;
  if (newX < 0 || newX > MAX || newY < 0 || newY > MAX) return;

  humanX = newX;
  humanY = newY;
  draw();

  if (isCaught()) endGame();
}

function moveUp()    { moveHuman(0, -STEP); }
function moveDown()  { moveHuman(0, STEP); }
function moveLeft()  { moveHuman(-STEP, 0); }
function moveRight() { moveHuman(STEP, 0); }

up.addEventListener("click", moveUp);
down.addEventListener("click", moveDown);
left.addEventListener("click", moveLeft);
right.addEventListener("click", moveRight);

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
    case "w":
      event.preventDefault();
      moveUp();
      break;
    case "ArrowDown":
    case "s":
      event.preventDefault();
      moveDown();
      break;
    case "ArrowLeft":
    case "a":
      event.preventDefault();
      moveLeft();
      break;
    case "ArrowRight":
    case "d":
      event.preventDefault();
      moveRight();
      break;
  }
});