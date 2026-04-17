let map = document.getElementById('map');
let ctx = map.getContext('2d');

setInterval(gameTick, 1);
window.addEventListener("keydown", keyPressed);
window.addEventListener("keyup", keyUp);

let position = {
  x: 200,
  y: 200
};
let velocity = {
  x: 0,
  y: 0
};
let rad = 40
speed = 5;

function gameTick() {
  physics();
  draw();
};

function physics() {
  adjustVelocity();
  position.y += velocity.y;
  position.x += velocity.x;
  if(position.y > 480 - rad){
    position.y = 480 - rad;
  };
  if(position.y < 0 + rad){
    position.y = 0 + rad;
  };
  if(position.x < 0 + rad){
    position.x = 0 + rad;
  };
  if(position.x > 640 - rad){
    position.x = 640 - rad;
  };
};

function draw() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, 640, 480);

  ctx.fillStyle = "black"
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
  if(event.code === 'KeyW'){
    velocity.y = -speed;
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