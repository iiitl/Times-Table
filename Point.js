class Point {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
    draw () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, true);
        ctx.fill();
    }
}