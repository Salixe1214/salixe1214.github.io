class Pause {
  constructor() {
    this.width = 640;
    this.height = 480;
  }

  physics(delta){
  }

  draw(delta){
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = "green"
    ctx.fillRect(
      (this.width / 2) - 100,
      (this.height / 2) - 35,
      200,
      70
    );

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("PAUSE", (this.width / 2) - 50, (this.height / 2) - 5);
    ctx.fillText(
      player.collectedCoins + " coins",
      (this.width / 2) - 67,
      (this.height / 2) + 30
    );
  }

  keyDown(event){
  }

  keyUp(event){
  }
}