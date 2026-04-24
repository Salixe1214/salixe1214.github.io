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


let map = document.getElementById('map');
let ctx = map.getContext('2d');
let refresh_rate = 60;  // In frame per second
let now = Date.now();
let delta = 0;

setInterval(gameTick, 1000 / refresh_rate);
window.addEventListener("keydown", keyPressed);
window.addEventListener("keyup", keyUp);

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

let player = new Player();

function gameTick() {
  delta = (Date.now() - now)/1000;
  now = Date.now();
  physics();
  draw();
};

function physics() {
  player.physics();
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

  player.draw();
};

function keyPressed (event) {
  player.keyDown(event);
};

function keyUp (event) {
  player.keyUp(event);
};