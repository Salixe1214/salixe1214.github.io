class Camera {
  constructor(position = new Vector2(0,0)) {
    this.position = position;
    this.width = 640;
    this.height = 480;
    this.axis = new Vector2(0,0);
    this.timer = new Vector2(0,0);
    this.displacement = 50;
  }

  physics(){
    if(this.position.x - (this.timer.x * this.displacement) + (this.width/2) > player.position.x){
      this.axis.x = -1;
    } else if(this.position.x - (this.timer.x * this.displacement) + (this.width/2) < player.position.x){
      this.axis.x = 1;
    } else{
      this.axis.x = 0;
    }
    this.timer.x += delta * this.axis.x;
    if(this.axis.x === 0){
      this.timer.x -= delta * (this.timer.x < 0 ? -1 : (this.timer.x > 0 ? 1 : 0));
    }
    if(this.timer.x > 1){
      this.timer.x = 1;
    }
    if(this.timer.x < -1){
      this.timer.x = -1;
    }

    if(this.position.y > player.position.y){
      this.axis.y = 1;
    } else if(this.position.y < player.position.y){
      this.axis.y = -1;
    } else{
      this.axis.y = 0;
    }

    this.position = new Vector2(
      player.position.x + (this.timer.x * this.displacement) - (camera.width / 2),
      player.position.y + (player.getVelocity().y * 2) - (camera.height / 2)
    );
  }

  keyDown(event) {
  }

  keyUp(event) {
  }
}