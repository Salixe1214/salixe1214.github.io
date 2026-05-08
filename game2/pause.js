class Pause {
  constructor() {
    this.width = 640;
    this.height = 480;
    this.buttons = [
      new Button(
        this.main_game,
        "Rammasse des sous",
        new Vector2(this.width / 2, (this.height / 2) - 75),
        new Vector2(400, 70)
      ),
      new Button(
        this.roulette,
        "Roulette",
        new Vector2(this.width / 2, (this.height / 2) + 75),
        new Vector2(400, 70)
      )
    ];
  }

  physics(delta){
  }

  draw(delta){
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, this.width, this.height);

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

  main_game() {
    active_room = 0;
    prev_room = 1;
  }

  roulette() {
    active_room = 2;
    prev_room = 1;
  }
}