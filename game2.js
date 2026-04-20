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
  if(position.y + rad > 95 && position.y - rad < 155){
    if(position.x + rad + velocity.x > 295 && position.x - rad + velocity.x < 405){
      return false;
    };
  };

  if(position.y + rad > 245 && position.y - rad < 305){
    if(position.x + rad + velocity.x > 495 && position.x - rad + velocity.x < 575){
      return false;
    };
  };

  return true;
}

function canMoveY() {
  if(position.x + rad > 295 && position.x - rad < 405){
    if(position.y + rad + velocity.y > 95 && position.y - rad + velocity.y < 155){
      return false;
    };
  };

  if(position.x + rad > 495 && position.x - rad < 575){
    if(position.y + rad + velocity.y > 245 && position.y - rad + velocity.y < 305){
      return false;
    };
  };

  return true;
}

function draw() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, 640, 480);

  ctx.fillStyle = "black"
  ctx.stroke()
  ctx.fillRect(300, 100, 100, 50);
  ctx.beginPath();
  ctx.moveTo(295, 95);
  ctx.lineTo(405, 95);
  ctx.lineTo(405, 155);
  ctx.lineTo(295, 155);
  ctx.lineTo(295, 95);
  ctx.stroke();

  ctx.stroke()
  ctx.fillRect(500, 250, 70, 50);
  ctx.beginPath();
  ctx.moveTo(495, 245);
  ctx.lineTo(575, 245);
  ctx.lineTo(575, 305);
  ctx.lineTo(495, 305);
  ctx.lineTo(495, 245);
  ctx.stroke();

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