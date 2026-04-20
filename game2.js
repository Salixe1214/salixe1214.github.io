let map = document.getElementById('map');
let ctx = map.getContext('2d');

setInterval(gameTick, 1);
window.addEventListener("keydown", keyPressed);
window.addEventListener("keyup", keyUp);


class Vector2 {
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }
}
let velocity = new Vector2(0,0);
let position = new Vector2(200, 200);

let rad = 40
speed = 5;

class RectWall {
  constructor(start = new Vector2(0,0), end = new Vector2(0,0), color="black") {
    this.start = start;
    this.end = end;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.fillRect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
    ctx.beginPath();
    ctx.moveTo(this.start.x - 5, this.start.y - 5);
    ctx.lineTo(this.end.x + 5, this.start.y - 5);
    ctx.lineTo(this.end.x + 5, this.end.y + 5);
    ctx.lineTo(this.start.x - 5, this.end.y + 5);
    ctx.lineTo(this.start.x - 5, this.start.y - 5);
    ctx.stroke();
  }

  is_inside_x(point = new Vector2(0, 0), delta = 0, velo =0){
    if(point.y + delta > this.start.y - 5 && point.y - delta < this.end.y + 5){
      if(point.x + delta + velo > this.start.x - 5 && point.x - delta + velo < this.end.x + 5){
        return true;
      };
    };
    return false;
  }

  is_inside_y(point = new Vector2(0, 0), delta = 0, velo = 0){
    if(point.x + delta > this.start.x - 5 && point.x - delta < this.end.x + 5){
      if(point.y + delta + velo > this.start.y - 5 && point.y - delta + velo < this.end.y + 5){
        return true;
      };
    };
    return false;
  }

  on_ground(point = new Vector2(0, 0), delta = 0, velo = 0){
    if(point.x + delta > this.start.x - 5 && point.x - delta < this.end.x + 5){
      if(point.y + delta + velo + 5 > this.start.y - 5 && point.y - delta + velo < this.start.y + 5){
        return true;
      };
    };
    return false;
  }
}

let walls = [
  new RectWall(new Vector2(300, 100), new Vector2(400, 150)),
  new RectWall(new Vector2(500, 250), new Vector2(570, 300)),
  new RectWall(new Vector2(50, 300), new Vector2(150, 350), "red"),
  new RectWall(new Vector2(0, 460), new Vector2(640, 480), "blue")
];

function gameTick() {
  physics();
  draw();
};

function physics() {
  adjustVelocity();
  velocity.y += 0.49;
  if(canMoveX()){position.x += velocity.x;};
  if(canMoveY()){position.y += velocity.y;};

  if(position.y + rad > 480){
    position.y = 480 - rad;
  };
  if(position.y - rad < 0){
    position.y = 0 + rad;
  };
  if(position.x - rad < 0){
    position.x = 0 + rad;
  };
  if(position.x + rad > 640){
    position.x = 640 - rad;
  };
};

function canMoveX() {
  for(let id in walls){
    if(walls[id].is_inside_x(position, rad, velocity.x)){return false;};
  };

  return true;
}

function canMoveY() {
  for(let id in walls){
    if(walls[id].is_inside_y(position, rad, velocity.y)){
      velocity.y = 0;
      return false;
    };
  };

  return true;
}

function draw() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, 640, 480);

  for(let id in walls){
    walls[id].draw();
  };

  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(position.x, position.y, rad, 0, 2 * Math.PI);
  ctx.stroke();
};

function adjustVelocity() {
  if(Math.abs(velocity.x) === Math.abs(velocity.y) && velocity.x != 0){
    velocity.x = speed * (velocity.x / Math.abs(velocity.x)) * (Math.sqrt(2)/2);
    velocity.y = speed * (velocity.y / Math.abs(velocity.y)) * (Math.sqrt(2)/2);
  } else if (Math.abs(velocity.x) === speed * (Math.sqrt(2)/2)) {
    velocity.x = speed * (velocity.x / Math.abs(velocity.x));
  } else if (Math.abs(velocity.y) === speed * (Math.sqrt(2)/2)) {
    velocity.y = speed * (velocity.y / Math.abs(velocity.y));
  }
};

function keyPressed (event) {
  if(event.code === 'KeyW' && isOnGround()){
    velocity.y = -speed * 3;
  };
  if(event.code === 'KeyA'){
    velocity.x = -speed;
  };
  if(event.code === 'KeyS'){
    velocity.y = speed * 3;
  };
  if(event.code === 'KeyD'){
    velocity.x = speed;
  };
};

function keyUp (event) {
  if(event.code === 'KeyW'){
    velocity.y = velocity.y < 0 ? 0 : velocity.y;
  };
  if(event.code === 'KeyA'){
    velocity.x = velocity.x < 0 ? 0 : velocity.x;
  };
  if(event.code === 'KeyS'){
    velocity.y = velocity.y > 0 ? 0 : velocity.y;
  };
  if(event.code === 'KeyD'){
    velocity.x = velocity.x > 0 ? 0 : velocity.x;
  }
};

function isOnGround() {
  for(let i in walls){
    if(walls[i].on_ground(position, rad, velocity.y)){
      return true;
    };
  };
  return false;
};