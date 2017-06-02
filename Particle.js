function Particle(pos) {
  this.acc = createVector();
  this.vel = createVector(random(), random());
  this.pos = createVector(pos.x, pos.y);
  this.prevPos = this.pos.copy();

  this.update = function() {
    this.edges();
    this.prevPos = this.pos.copy()
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.follow();
  }

  this.follow = function() {
    let i = floor(this.pos.x / scl);
    let j = floor(this.pos.y / scl);
    this.applyForce(flowfield[i + j * cols]);
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.prevPos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.prevPos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.prevPos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.prevPos.Y = height;
    }
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.display = function(color) {
    // stroke(color);
    stroke(0, 25);
    // strokeWeight(2);
    fill(0);
    // ellipse(this.pos.x, this.pos.y, 4, 4);
    line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
  }
}
