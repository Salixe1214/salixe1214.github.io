let coins_count = 0;

class Coin {
  constructor(position = new Vector2(0,0), radius = 1, color="yellow") {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.id = coins_count;
    coins_count += 1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius + 1, 0, 2 * Math.PI);
    ctx.fill();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  is_inside(point = new Vector2(0, 0), delta = 0, velo = new Vector2(0,0)){
    let pointsVect = new Vector2(
      this.position.x - (point.x - velo.x),
      this.position.y - (point.y - velo.y)
    );
    return pointsVect.length() <= delta;
  }
}