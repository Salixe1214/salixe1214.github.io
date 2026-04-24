let map = document.getElementById('map');
let ctx = map.getContext('2d');

let surface = "air";
let refresh_rate = 60;  // In frame per second
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

  length(){
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
}

let velocity = new Vector2(0,0);
let position = new Vector2(200, 200);

let rad = 40
let speed = 500;
let jumpSpeedModif = 3;
let gravity = 9807/2;

let walls = [
  new RectWall(new Vector2(300, 100), new Vector2(400, 150)),
  new RectWall(new Vector2(500, 250), new Vector2(570, 300)),
  new RectWall(new Vector2(50, 300), new Vector2(150, 350), "red"),
  new RectWall(new Vector2(0, 460), new Vector2(640, 480), "blue"),
  new RectWall(new Vector2(600, 350), new Vector2(640, 480), "brown"),
  new RectWall(new Vector2(300, 350), new Vector2(340, 480), "brown")
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
  if(!isOnGround())velocity.y += gravity * delta;
  position.x += velocity.x * delta;
  position.y += velocity.y * delta;

  wallCollide();
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

function wallCollide() {
  surface = "air";
  for(let id in walls){
    collision = walls[id].collision(position, rad);
    if(walls[id].floor || walls[id].ceil){
      velocity.y = 0;
      if(walls[id].floor){
        surface = "floor";
      };
      if(walls[id].ceil){
        surface = "ceil";
      };
      position.y = collision.y;
    }else{
      if(walls[id].right){
        surface = "right";
      };
      if(walls[id].left){
        surface = "left";
      };
      position.x = collision.x;
    };
  };
  console.log("2: " + velocity.y);
}

function coinsCollide() {
  let processed_coins = [];
  for(let id in coins){
    if(!coins[id].is_inside(position, rad, new Vector2(velocity.x * delta, velocity.y * delta))){
      processed_coins.push(coins[id]);
    } else{
      collectedCoins += 1;
    };
  };

  coins = processed_coins;
}

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
    if(walls[i].floor){
      surface = "floor"
      return true;
    };
  };
  return false;
};