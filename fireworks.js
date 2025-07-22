
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFirework() {
  const x = random(100, canvas.width - 100);
  const y = random(100, canvas.height / 2);
  const colors = ["#ff4dcf", "#fdd835", "#4dd0e1", "#ab47bc", "#ff7043"];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: x,
      y: y,
      speed: Math.random() * 5,
      angle: Math.random() * 2 * Math.PI,
      radius: 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 100
    });
  }
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    const vx = Math.cos(p.angle) * p.speed;
    const vy = Math.sin(p.angle) * p.speed;
    p.x += vx;
    p.y += vy;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.life <= 0) particles.splice(i, 1);
  });

  if (Math.random() < 0.05) {
    createFirework();
  }

  requestAnimationFrame(draw);
}

draw();
