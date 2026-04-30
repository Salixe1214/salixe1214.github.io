class Camera {
  constructor(player = new Player()) {
    this.player = player;
    this.width = 640;
    this.height = 480;
    this.position = new Vector2(
      player.position.x, // - (this.width / 2),
      player.position.y// - (this.height / 2)
    );
    this.axis = new Vector2(0,0);
    this.timer = new Vector2(0,0);
    this.displacement = 50;
  }

  physics(delta){
    this.axis = new Vector2(
        this.player.velocity.x * delta * (50/player.speed),
        this.player.velocity.y * delta * (50/player.speed)
    );
    this.timer.x += delta * this.axis.x * 5;
    if(this.axis.x === 0){
      this.timer.x -= delta * 5 * (this.timer.x < 0 ? -1 : (this.timer.x > 0 ? 1 : 0));
      if(Math.abs(this.timer.x) < 0.1)this.timer.x = 0;
    }
    if(this.timer.x > 1){
      this.timer.x = 1;
    }
    if(this.timer.x < -1){
      this.timer.x = -1;
    }

    this.timer.y += delta * this.axis.y * 5;
    if(this.axis.y === 0){
      this.timer.y -= delta * 5 * (this.timer.y < 0 ? -1 : (this.timer.y > 0 ? 1 : 0));
      if(Math.abs(this.timer.y) < 0.1)this.timer.y = 0;
    }
    if(this.timer.y > 1){
      this.timer.y = 1;
    }
    if(this.timer.y < -1){
      this.timer.y = -1;
    }

    this.position = new Vector2(
      this.player.position.x + (this.timer.x * this.displacement) - (camera.width / 2),
      this.player.position.y + (this.timer.y * this.displacement * 0.5) - (camera.height / 2)
    );
  }

  keyDown(event) {
  }

  keyUp(event) {
  }
}