const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const microphone = new Microphone();

class Figure {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 8;
    this.color = "yellow";
    this.counter = 0;
  }

  draw() {
    ctx.fillStyle = `rgb(${200},${Math.random() * 255},${Math.random() * 255})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  circularMovement() {
    if (this.counter >= 360) {
      this.counter = 0;
    }
    this.x += Math.cos((this.counter / 180) * Math.PI);
    this.y += Math.sin((this.counter / 180) * Math.PI);

    this.counter++;
  }
  changeSize(value) {
    if (value * 50 > this.size) {
      this.size = value * 200;
    } else {
      this.size -= this.size * 0.1;
    }
  }
  teleport() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
  }
}
let figures = [];

for (let i = 0; i < 50; i++) {
  figures.push(
    new Figure(Math.random() * canvas.width, Math.random() * canvas.height)
  );
}
const animate = () => {
  if (microphone.initialized) {
    const samples = microphone.getSamples();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    figures.map((f, i) => {
      f.draw();
      f.circularMovement();
      f.changeSize(samples[i]);
      if (Math.random() > 0.99) {
        f.teleport();
      }
    });
  }
  requestAnimationFrame(animate);
};

animate();
