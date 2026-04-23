let map = document.getElementById('map');
let ctx = map.getContext('2d');

let surface = "air";
let refresh_rate = 600;  // In frame per second
let now = Date.now();
let delta = 0;

setInterval(gameTick, 1000 / refresh_rate);
window.addEventListener("keydown", keyPressed);
window.addEventListener("keyup", keyUp);


class Vector2 {
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }

  to_s(){
    return this.x + "\n" + this.y
  }
}
let velocity = new Vector2(0,0);
let position = new Vector2(200, 200);

let rad = 40
let speed = 500;
let jumpSpeedModif = 3;
let gravity = 9807/2;

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
        surface = "wall";
        return true;
      };
    };
    return false;
  }

  on_ceil(point = new Vector2(0, 0), delta = 0, velo = 0){
    if(point.x + delta > this.start.x - 5 && point.x - delta < this.end.x + 5){
      if(point.y - delta + velo < this.end.y + 5 && point.y + delta > this.end.y + 5){
        surface = "ceil";
        return true;
      };
    };
    return false;
  }

  on_ground(point = new Vector2(0, 0), delta = 0, velo = 0){
    if(point.x + delta > this.start.x - 5 && point.x - delta < this.end.x + 5){
      if(point.y + delta + velo > this.start.y - 5 && point.y - delta < this.start.y - 5){
        surface = "ground";
        return true;
      };
    };
    return false;
  }
}

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

  is_inside(point = new Vector2(0, 0), delta = 0, velo =0){
    if(
      point.y + delta > this.position.y - this.radius - 5 &&
      point.y - delta < this.position.y + this.radius + 5 &&
      point.x + delta > this.position.x - this.radius - 5 &&
      point.x - delta < this.position.x + this.radius + 5
    ){
      return true;
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

let coins = [
  // On wall 1
  new Coin(new Vector2(350, 87), 5),
  new Coin(new Vector2(325, 87), 5),
  new Coin(new Vector2(375, 87), 5),
  // On wall 2
  new Coin(new Vector2(517, 250 - 13), 5),
  new Coin(new Vector2(535, 250 - 13), 5),
  new Coin(new Vector2(553, 250 - 13), 5),
  // On wall 3
  new Coin(new Vector2(75, 300 - 13), 5),
  new Coin(new Vector2(100, 300 - 13), 5),
  new Coin(new Vector2(125, 300 - 13), 5),
  // On floor (wall 4)
  new Coin(new Vector2(40, 440), 5),
  new Coin(new Vector2(80, 440), 5),
  new Coin(new Vector2(120, 440), 5),
  new Coin(new Vector2(160, 440), 5),
  new Coin(new Vector2(200, 440), 5),
  new Coin(new Vector2(240, 440), 5),
  new Coin(new Vector2(280, 440), 5),
  new Coin(new Vector2(320, 440), 5),
  new Coin(new Vector2(360, 440), 5),
  new Coin(new Vector2(400, 440), 5),
  new Coin(new Vector2(440, 440), 5),
  new Coin(new Vector2(480, 440), 5),
  new Coin(new Vector2(520, 440), 5),
  new Coin(new Vector2(560, 440), 5),
  new Coin(new Vector2(600, 440), 5)
];

let collectedCoins = 0;

function gameTick() {
  delta = (Date.now() - now)/1000;
  now = Date.now();
  physics();
  draw();
};

function physics() {
  velocity.y += gravity * delta;
  surface = "air";
  if(canMoveX()){position.x += velocity.x * delta;};
  if(canMoveY()){position.y += velocity.y * delta;};

  coinsCollide();

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
    if(walls[id].is_inside_x(position, rad, velocity.x * delta)){
      return false;
    };
  };

  return true;
}

function canMoveY() {
  for(let id in walls){
    if(
      walls[id].on_ceil(position, rad, velocity.y * delta) ||
      walls[id].on_ground(position, rad, velocity.y * delta)
    ){
      velocity.y = 0;
      return false;
    };
  };

  return true;
}

function coinsCollide() {
  let processed_coins = [];
  for(let id in coins){
    if(!coins[id].is_inside(position, rad, velocity.x * delta)){
      processed_coins.push(coins[id]);
    } else{
      collectedCoins += 1;
    };
  };

  coins = processed_coins;
}

function draw() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, 640, 480);

  for(let wall_id in walls){
    walls[wall_id].draw();
  };

  for(let coin_id in coins){
    coins[coin_id].draw();
  };

  ctx.fillStyle = "green";
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(position.x, position.y, rad, 0, 2 * Math.PI);
  ctx.fill()
  ctx.arc(position.x, position.y, rad-1, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Coins: " + collectedCoins, 15, 45);
  ctx.fillText(surface, 15, 90);
};

function keyPressed (event) {
  if(event.code === 'KeyW' && isOnGround()){
    velocity.y = -speed * jumpSpeedModif;
  };
  if(event.code === 'KeyA'){
    velocity.x = -speed;
  };
  if(event.code === 'KeyS'){
    velocity.y = speed;
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
    if(walls[i].on_ground(position, rad, speed * delta)){
      return true;
    };
  };
  return false;
};