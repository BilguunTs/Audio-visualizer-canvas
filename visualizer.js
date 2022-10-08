const microphone = new Microphone();

const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
resizeCanvas();
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.color = "yellow";
    this.jumpForce = 4;
    this.fallForce = 0.1;
    this.isFalling = true;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  fall() {
    this.jumpForce = 0;
    this.y += this.fallForce;
    this.fallForce += 0.5;
  }
  jump() {
    this.fallForce = 0;
    this.y -= this.jumpForce;
    this.jumpForce -= 0.05;
  }
}
let balls = [];
const generatBalls = () => {
  const distance = 6;
  const amountOfBalls = canvas.width / distance - 2;
  for (let i = 0; i < amountOfBalls; i++) {
    let dx = i * distance + distance;
    balls.push(new Ball(dx, canvas.height / 2));
  }
};
generatBalls();

function animate() {
  if (microphone.initialized) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const samples = microphone.getSamples();
    //  console.log(samples);
    balls.forEach((ball, index) => {
      if (ball.isFalling && ball.y < canvas.height * 0.7) {
        ball.fall();
      } else if (ball.y > canvas.height * 0.7) {
        ball.isFalling = false;
        ball.jumpForce = Math.abs(samples[index]) * 10;
      }
      if (!ball.isFalling) {
        ball.jump();
        if (ball.jumpForce <= 0) {
          ball.isFalling = true;
        }
      }
      ball.draw();
    });
  }

  requestAnimationFrame(animate);
}
animate();
