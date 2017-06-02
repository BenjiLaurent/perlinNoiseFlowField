var inc = 0.1;
var scl = 20;
var cols, rows, fr;

var zoff = 0;
var roff = 0;
var goff = 0;
var boff = 0;

var particles = [];
var flowfield = [];

function setup() {
  createCanvas(1200, 600);
  cols = floor(width / scl);
  rows = floor(height / scl);
  for (var i = 0; i < 500; i++) {
    particles.push(new Particle(createVector(random(width), random(height))));
  }
  fr = createP();
}

function draw() {
  let yoff = 0;
  flowfield = [];

  roff += 0.01;
  goff += 0.01;
  boff += 0.01;
  let rCol = map(noise(roff), 0, 1, 0, 255);
  let gCol = map(noise(goff), 0, 1, 0, 255);
  let bCol = map(noise(boff), 0, 1, 0, 255);
  let c = color(rCol, gCol, boff, 5);
  for (var i = 0; i < cols; i++) {
    let xoff = 0;
    for (var j = 0; j < rows; j++) {
      let rand = map(noise(xoff, yoff, zoff), 0, 1, 0, 4 * PI);
      let v = p5.Vector.fromAngle(rand);
      v.setMag(0.1);
      flowfield.push(v);
      // push();
      // translate(i * scl, j * scl);
      // rotate(v.heading());
      // stroke(0, 50);
      // line(0, 0, scl, 0);
      // pop();
      xoff += inc;
    }
    yoff += inc;
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].display(c);
    particles[i].update();
  }
  fr.html(floor(frameRate()));
  zoff += 0.005;
}

function mousePressed() {
  particles.push(new Particle(createVector(mouseX, mouseY)));
}
