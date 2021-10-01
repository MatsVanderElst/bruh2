import Vector from './Vector.js';
import {random} from '../functions/lib.js';

class Particle {
    constructor($canvas, mouse, x, y, color) {
        this.$canvas = $canvas;
        this.ctx = $canvas.getContext(`2d`);
        this.mouse = mouse;

        this.location = new Vector(x, y);
        this.velocity = new Vector(random(-2,2), random(-2,2));
        this.acceleration = new Vector(-0.001, 0.01);

        this.color = color;
        this.size = 1;

        this.lifespan = 200;
    }
    draw() {
       this.acceleration = Vector.subtract(this.mouse, this.location)
       .normalize()
       .multiply(Math.random());

        this.velocity.add(this.acceleration);
        // set limit to 10 for more distributed particles
        this.velocity.limit(10);
        this.location.add(this.velocity);
        this.lifespan - 1;

        this.checkCollision();

        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.location.x, this.location.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();

    }
    checkCollision() {
        if (this.location.x > this.$canvas.width) {
            this.location.x = 0;
        }
        if (this.location.x < 0) {
            this.location.x = this.$canvas.width;
        }

        if (this.location.y > this.$canvas.height) {
            this.location.y = 0;
        }
        if (this.location.y < 0) {
            this.location.y = this.$canvas.height;
        }
    }

}

export default Particle;
