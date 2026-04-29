let coins_count = 0;

class Coin {
  constructor(position = new Vector2(0,0), radius = 1, color="yellow") {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.id = coins_count;
    this.exist = true;
    this.timer = 10000;
    coins_count += 1;
  }

  draw() {
    if(this.exist){
      let drawPosition = new Vector2(
        this.position.x - camera.position.x,
        this.position.y - camera.position.y
      );

      ctx.fillStyle = this.color;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.arc(drawPosition.x, drawPosition.y, this.radius + 1, 0, 2 * Math.PI);
      ctx.fill();
      ctx.arc(drawPosition.x, drawPosition.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if(this.timer > 10){
      this.exist = true;
    } else {
      this.timer += delta;
    }
  }

  is_inside(point = new Vector2(0, 0), delta = 0, velo = new Vector2(0,0)){
    let pointsVect = new Vector2(
      this.position.x - (point.x - velo.x),
      this.position.y - (point.y - velo.y)
    );
    return this.exist && (pointsVect.length() <= delta + this.radius);
  }

  collected(){
    this.exist = false;
    this.timer = 0;
  }
}