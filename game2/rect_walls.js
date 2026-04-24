let wall_count = 0;

class RectWall {
  constructor(start = new Vector2(0,0), end = new Vector2(0,0), color="black") {
    this.start = start;
    this.end = end;
    this.color = color;
    this.id = wall_count;
    this.floor = false;
    this.ceil = false;
    this.left = false;
    this.right = false;
    wall_count += 1;
  }

  draw() {
    let drawStart = new Vector2(
      this.start.x - camera.position.x,
      this.start.y - camera.position.y
    );
    let drawEnd = new Vector2(
      this.end.x - camera.position.x,
      this.end.y - camera.position.y
    );
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.fillRect(
      drawStart.x + 5,
      drawStart.y + 5,
      drawEnd.x - drawStart.x - 10,
      drawEnd.y - drawStart.y - 10
    );
    ctx.beginPath();
    ctx.moveTo(drawStart.x, drawStart.y);
    ctx.lineTo(drawEnd.x, drawStart.y);
    ctx.lineTo(drawEnd.x, drawEnd.y);
    ctx.lineTo(drawStart.x, drawEnd.y);
    ctx.lineTo(drawStart.x, drawStart.y);
    ctx.stroke();
  }

  collision(position = new Vector2(0,0), radius = 0){
    let test = new Vector2(position.x, position.y);
    this.floor = false;
    this.ceil = false;
    this.left = false;
    this.right = false;

    if(position.x < this.start.x){
      this.left = true;
      test.x = this.start.x;
    } else if(position.x > this.end.x){
      this.right = true;
      test.x = this.end.x;
    };

    if(position.y < this.start.y){
      this.floor = true;
      test.y = this.start.y;
    } else if(position.y > this.end.y){
      this.ceil = true;
      test.y = this.end.y;
    };

    let distVect = new Vector2(position.x - test.x, position.y - test.y);
    let dist = distVect.length();

    if (dist <= radius){
      let angleVector = new Vector2(test.x - position.x, test.y - position.y);
      let angle = Math.acos((angleVector.x) / angleVector.length()) || 0;
      if(angleVector.y < 0){angle = -angle;};
      let x = test.x - (radius * Math.cos(angle));
      let y = test.y - (radius * Math.sin(angle));

      return new Vector2(x, y);
    }else{
      this.floor = false;
      this.ceil = false;
      this.left = false;
      this.right = false;
    };

    return position;
  }
}