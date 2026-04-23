let wall_count = 0;

class RectWall {
  constructor(start = new Vector2(0,0), end = new Vector2(0,0), color="black") {
    this.start = start;
    this.end = end;
    this.color = color;
    this.id = wall_count;
    wall_count += 1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.fillRect(this.start.x + 5, this.start.y + 5, this.end.x - this.start.x - 10, this.end.y - this.start.y - 10);
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.lineTo(this.start.x, this.end.y);
    ctx.lineTo(this.start.x, this.start.y);
    ctx.stroke();
  }

  betweenX(position = new Vector2(0,0), radius){
    if(position.x + radius > this.start.x && position.x - radius < this.end.x){
      return true;
    }
  }

  betweenY(position = new Vector2(0,0), radius){
    if(position.y + radius > this.start.y && position.y - radius < this.end.y){
      return true;
    }
  }

  collide_right(position = new Vector2(0,0), radius = 0, velo = 0){
    let positionLeft = position.x - radius;
    if(this.betweenY(position, radius)){
      if(positionLeft > this.end.x + velo - 5 && positionLeft < this.end.x){
        return true;
      };
    };
    return false;
  }

  collide_left(position = new Vector2(0,0), radius = 0, velo = 0){
    let positionRight = position.x + radius;
    if(this.betweenY(position, radius)){
      if(positionRight < this.start.x + velo + 5 && positionRight > this.start.x){
        return true;
      };
    };
    return false;
  }

  collide_floor(position = new Vector2(0,0), radius = 0, velo = 0){
    let positionBot = position.y + radius;
    if(this.betweenX(position, radius)){
      if(positionBot < this.start.y + velo + 5 && positionBot > this.start.y){
        return true;
      };
    };
    return false;
  }

  collide_ceil(position = new Vector2(0,0), radius = 0, velo = 0){
    let positionTop = position.y - radius;
    if(this.betweenX(position, radius)){
      if(positionTop > this.end.y + velo - 5 && positionTop < this.end.y){
        return true;
      };
    };
    return false;
  }

  collision(position = new Vector2(0,0), radius = 0, velo = new Vector2(0,0)){
    let test = new Vector2(position.x, position.y);

    if(position.x < this.start.x){
      test.x = this.start.x;
    } else if(position.x > this.end.x){
      test.x = this.end.x;
    };

    if(position.y < this.start.y){
      test.y = this.start.y;
    } else if(position.y > this.end.y){
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
    };

    return position;
  }
}