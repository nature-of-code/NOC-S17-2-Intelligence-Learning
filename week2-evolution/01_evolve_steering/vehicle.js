// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

function Vehicle(x, y, dna) {
  this.acceleration = createVector();
  this.velocity = p5.Vector.random2D();
  this.position = createVector(x, y);
  this.r = 3;
  this.maxforce = 0.5;
  this.maxspeed = 3;

  // DNA
  // mutation
  if (dna instanceof Array) {
    this.dna = [];
    for (var i = 0; i < dna.length; i++) {
      // Mutation
      if (random(1) < 0.1) {
        // Steering weights and angle in radians
        if (i < 2) {
          this.dna[i] = dna[i] + random(-0.2, 0.2);
          // Perception radius
        } else {
          this.dna[i] = dna[i] + random(-10, 10);
          // max speed
        }
        // Copy DNA
      } else {
        this.dna[i] = dna[i];
      }
    }
  } else {
    var maxf = 3;
    this.dna = [random(-maxf, maxf), random(-maxf, maxf), random(5, 100), random(5, 100)];
  }
  this.velocity.setMag(this.maxspeed);

  // Health
  this.health = 1;

  // Method to update location
  this.update = function() {

    // if (this.acceleration.mag() == 0) {
    //   var steer = this.velocity.copy();
    //   steer.setMag(this.maxspeed);
    //   steer.sub(this. velocity);
    //   steer.limit(this.maxforce);
    //   this.applyForce(steer);
    // }

    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);

    // Slowly die unless you eat
    this.health -= 0.002;

  };

  this.dead = function() {
    return (this.health < 0);
  }

  this.birth = function() {
    var r = random(1);
    if (r < 0.001) {
      return new Vehicle(this.position.x, this.position.y, this.dna);
    }
  }

  this.eat = function(list, index) {
    var closest = null;
    var closestD = Infinity;
    for (var i = list.length - 1; i >= 0; i--) {
      var d = p5.Vector.dist(list[i], this.position);
      if (d < this.dna[2 + index] && d < closestD) {
        closestD = d;
        closest = list[i];
        if (d < 5) {
          list.splice(i, 1);
          // ate something
          this.health += nutrition[index];
        }
      }
    }
    if (closest) {
      var seek = this.seek(closest, index);
      seek.mult(this.dna[index]);
      seek.limit(this.maxforce);
      this.applyForce(seek);
    }
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  };

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target, index) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    var d = desired.mag();

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);

    // Not limiting here
    // steer.limit(this.maxforce);

    return steer;
  };


  this.display = function() {
    var green = color(0, 255, 0);
    var red = color(255, 0, 0);
    var col = lerpColor(red, green, this.health)

    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    if (debug.checked()) {
      noFill();
      stroke(0, 255, 0, 100);
      ellipse(0, 0, this.dna[2] * 2);
      line(0, 0, 0, -this.dna[0] * 25);

      stroke(255, 0, 0, 100);
      ellipse(0, 0, this.dna[3] * 2);
      line(0, 0, 0, -this.dna[1] * 25);
    }

    fill(col);
    stroke(col);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  };


  this.boundaries = function() {
    var d = 10;
    var desired = null;
    if (this.position.x < d) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }

    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.setMag(this.maxspeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  };


}
