let map = document.getElementById('map');
let ctx = map.getContext('2d');
let refresh_rate = 60;  // In frame per second
let now = Date.now();
let delta = 0;

setInterval(gameTick, 1000 / refresh_rate);
window.addEventListener("keydown", keyPressed);
window.addEventListener("keyup", keyUp);

let gamePadIds = [];
window.addEventListener("gamepadconnected", function(e) {
  gamePadIds.push(e.gamepad.index);
});

let player = new Player(new Vector2(150,150));
let camera = new Camera(player);

let main_room = new Room(
  player,
  [
    new RectWall(new Vector2(300, 100), new Vector2(400, 150)),
    new RectWall(new Vector2(500, 250), new Vector2(570, 300)),
    new RectWall(new Vector2(50, 300), new Vector2(150, 350), "red"),
    new RectWall(new Vector2(-500, 460), new Vector2(640, 480), "blue"),
    new RectWall(new Vector2(600, 350), new Vector2(640, 480), "brown"),
    new RectWall(new Vector2(300, 350), new Vector2(340, 480), "brown")
  ],
  [
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
    new Coin(new Vector2(360, 440), 5),
    new Coin(new Vector2(400, 440), 5),
    new Coin(new Vector2(440, 440), 5),
    new Coin(new Vector2(480, 440), 5),
    new Coin(new Vector2(520, 440), 5),
    new Coin(new Vector2(560, 440), 5),
    new Coin(new Vector2(600, 440), 5)
  ]
);

let active_room = main_room;

function gameTick() {
  for(let i in gamePadIds) {
    let gamePad = navigator.getGamepads()[gamePadIds[i]];
    for(let j in gamePad.buttons) {
      if(gamePad.buttons[j].pressed){
        if(!pressed[btn_map[j]])keyPressed(btn_converter[btn_map[j]]);
        pressed[btn_map[j]] = true;
      } else {
        if(pressed[btn_map[j]])keyUp(btn_converter[btn_map[j]]);
        pressed[btn_map[j]] = false;
      }
    }
  }
  delta = (Date.now() - now)/1000;
  now = Date.now();
  physics(delta);
  draw(delta);
}

function physics(delta) {
  camera.physics(delta);
  main_room.physics(delta);
}

function draw(delta) {
  main_room.draw(delta);

  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
}

function keyPressed (event) {
  camera.keyDown(event);
  active_room.keyDown(event);
}

function keyUp (event) {
  camera.keyUp(event);
  active_room.keyUp(event);
}