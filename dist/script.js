window.addEventListener("load", function () {
  let canvas = document.querySelector("#canvas");
  let c = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let innerHeight = canvas.height;
  let innerWidth = canvas.width;

  let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    innerHeight = canvas.height;
    innerWidth = canvas.width;
    init();
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("touchmove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function randFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function Circle(x, y, r, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.v = 0.05;
    this.vx = vx;
    this.vy = vy;
    this.radians = Math.random() * Math.PI * 2;
    this.color = color;
    this.dFromC = randFromRange(100, 200);
    this.lastM = { x: x, y: y };

    this.draw = (lastP) => {
      c.beginPath();
      c.strokeStyle = this.color;
      c.lineWidth = this.r;
      c.moveTo(lastP.x, lastP.y);
      c.lineTo(this.x, this.y);
      c.stroke();
      c.closePath();
    };

    this.update = () => {
      const lastP = { x: this.x, y: this.y };
      this.radians += this.v;
      this.lastM.x += (mouse.x - this.lastM.x) * 0.05;
      this.lastM.y += (mouse.y - this.lastM.y) * 0.05;
      this.x = this.lastM.x + Math.cos(this.radians) * this.dFromC;
      this.y = this.lastM.y + Math.sin(this.radians) * this.dFromC;
      this.draw(lastP);
    };
  }

  let circles;

  function init() {
    circles = [];
    for (let i = 0; i < 50; i++) {
      let randR = Math.random() * 5 + 1;
      let randColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)},${Math.random()})`;
      circles.push(
        new Circle(innerWidth / 2, innerHeight / 2, randR, 10, 10, randColor)
      );
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0,0.03)";
    c.fillRect(0, 0, innerWidth, innerHeight);
    circles.forEach((circle) => {
      circle.update();
    });
  }

  init();
  animate();
});
