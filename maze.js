
const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 30;
const maze = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,1],
  [1,0,1,1,1,0,1,0,1,1],
  [1,0,0,0,1,0,0,0,1,1],
  [1,1,1,0,1,1,1,0,1,1],
  [1,0,0,0,0,0,1,0,0,1],
  [1,0,1,1,1,0,1,1,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

let player = { x: 1, y: 1 };
const goal = { x: 8, y: 8 };

function drawMaze() {
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      ctx.fillStyle = maze[y][x] === 1 ? "#333" : "#fff";
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
  ctx.fillStyle = "#fdd835"; // goal
  ctx.fillRect(goal.x * tileSize, goal.y * tileSize, tileSize, tileSize);
  ctx.fillStyle = "#ff4dcf"; // player
  ctx.beginPath();
  ctx.arc(player.x * tileSize + tileSize / 2, player.y * tileSize + tileSize / 2, tileSize / 3, 0, 2 * Math.PI);
  ctx.fill();
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;
  if (maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
    drawMaze();
    if (player.x === goal.x && player.y === goal.y) {
      document.getElementById("message").style.display = "block";
    }
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": movePlayer(0, -1); break;
    case "ArrowDown": movePlayer(0, 1); break;
    case "ArrowLeft": movePlayer(-1, 0); break;
    case "ArrowRight": movePlayer(1, 0); break;
  }
});

drawMaze();
