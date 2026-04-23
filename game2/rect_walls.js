class RectWall {
  constructor(start = new Vector2(0,0), end = new Vector2(0,0), color="black") {
    this.start = start;
    this.end = end;
    this.color = color;
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
    // Return the new position of the colided
    let colX = position.x;
    let colY = position.y;
    if(this.collide_left(position, radius, velo.x * delta)){
      colX = this.start.x - radius;
    };
    if(this.collide_right(position, radius, velo.x * delta)){
      colX = this.end.x + radius;
    }
    if(this.collide_floor(position, radius, velo.y * delta)){
      colY = this.start.y - radius;
    };
    if(this.collide_ceil(position, radius, velo.y * delta)){
      colY = this.end.y + radius;
    }
    return new Vector2(colX, colY);
  }
}