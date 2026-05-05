class Pause {
  constructor() {
    this.width = 640;
    this.height = 480;
    this.buttons = [
      new Button(
        new Vector2(this.width / 2, this.height / 2),
        new Vector2(200, 70)
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
}