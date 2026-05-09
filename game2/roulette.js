class Roulette {
  constructor(player = new Player()) {
    this.player = player;
    this.colors = [
      "green", "red", "black", "red", "black", "red", "black", "red", "black",
      "red", "black", "black", "red", "black", "red", "black", "red", "black",
      "red", "red", "black", "red", "black", "red", "black", "red", "black", "red",
      "black", "black", "red", "black", "red", "black", "red", "black", "red"
    ];

    this.one_number = 35;
    this.two_number = 17;   // Touching on the grid (a - b = 1 || a - b = 3)
    this.four_numbers = 8;  // In a square on the grid
    this.street = 11;       // 3 consecutive numbers in a row (c - a = 2 %% c % 3 = 0)
    this.six_lines = 5;     // 2 consecutive streets

    this.even = 1;          // pair, impair, couleur, <= 18, > 18
    this.dozen = 2;         // 1 - 12, 13 - 24, 25 - 36
    this.column = 2;        // [1,4,7,10,13,16,19,22,25,28,31,34]
                            // [2,5,8,11,14,17,20,23,26,29,32,35]
                            // [3,6,9,12,15,18,21,24,27,30,33,36]

    this.cylindre = [
      0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
      16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
    ]

    this.segment_angle = 2 * (Math.PI / 37);
    this.rot_angle = (1.5 * Math.PI) + (this.segment_angle / 2);
    this.max_rot_speed = 150;
    this.min_rot_speed = 1.5;
    this.rot_speed =  0;
    this.active_number = 0;

    this.radius = 100;
    this.position = new Vector2(this.radius + 25, camera.height / 2);
    this.arrow_size = new Vector2(10, 20);

    // Btns
    this.buttons = [
        new Button(
          this.startSpin,
          "Spin!",
          new Vector2(camera.width - 75, camera.height - 50),
          new Vector2(100, 50)
        )
    ];
  }

  physics(delta){
    if(this.rot_speed > this.min_rot_speed){
      this.rot_speed -= delta * (Math.random() * this.rot_speed / 2);
    } else if (this.rot_speed <= this.min_rot_speed) this.rot_speed = 0;
    this.rot_angle += this.rot_speed*(delta / (2 * Math.PI));
  }

  draw(delta){
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, camera.width, camera.height);
    ctx.fill();

    ctx.strokeStyle = "black";
    let angle = (2 * (-1) * (Math.PI / 37)) + this.rot_angle;
    let prev_angle = 0;
    for (let i = 0 ; i <= 36 ; i++){
      ctx.fillStyle = this.colors[this.cylindre[i]];
      ctx.beginPath();
      prev_angle = angle;
      angle = ((2 * i * (Math.PI / 37)) + this.rot_angle) % (2 * Math.PI);

      if(angle > (1.5 * Math.PI) && (angle - this.segment_angle) < (1.5 * Math.PI)){
        this.active_number = this.cylindre[i];
      }

      ctx.arc(
        this.position.x,
        this.position.y,
        this.radius,
        (2 * (i-1) * (Math.PI / 37)) + this.rot_angle,
        angle
      );

      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(
        (this.position.x) + (this.radius * Math.cos(angle)),
        (this.position.y) + (this.radius * Math.sin(angle))
      );
      ctx.lineTo(
        (this.position.x) + (this.radius * Math.cos(prev_angle)),
        (this.position.y) + (this.radius * Math.sin(prev_angle))
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = "yellow";
      ctx.font = (3 * this.radius / 40) + "px Arial";
      let num_angle = angle - (this.segment_angle / 2);
      ctx.fillText(
        this.cylindre[i],
        (this.position.x) + ((7 * this.radius / 8) * Math.cos(num_angle)),
        (this.position.y) + ((7 * this.radius / 8) * Math.sin(num_angle))
      );
    }
    ctx.fillStyle = "grey";
    ctx.beginPath();
    ctx.moveTo((this.position.x) - (this.arrow_size.x / 2), (this.position.y) - (this.radius + (3 * this.arrow_size.y / 4)));
    ctx.lineTo((this.position.x) + (this.arrow_size.x / 2), (this.position.y) - (this.radius + (3 * this.arrow_size.y / 4)));
    ctx.lineTo((this.position.x), (this.position.y) - (this.radius - (this.arrow_size.y / 4)));
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = this.colors[this.active_number];
    ctx.fillRect(15, 10, 30,30);
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText(this.active_number, 30, 27);

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText("Coins: " + player.collectedCoins, 15, 45);

    this.buttons.forEach(btn => {
      btn.draw();
    });
  }

  keyDown(event){
  }

  keyUp(event){
  }

  onClick(event){
    this.buttons.forEach(btn => {
      btn.onClick(event);
    });
  }

  mouseUp(event){
    this.buttons.forEach(btn => {
      btn.mouseUp(event);
    });
  }

  onMouseMove(event) {
    this.buttons.forEach(btn => {
      btn.onMouseMove(event);
    });
  }

  startSpin() {
    roulette.rot_speed = roulette.max_rot_speed;
  }
}



//    00
// 01 02 03
// 04 05 06
// 07 08 09
// 10 11 12

// 13 14 15
// 16 17 18
// 19 20 21
// 22 23 24

// 25 26 27
// 28 29 30
// 31 32 33
// 34 35 36