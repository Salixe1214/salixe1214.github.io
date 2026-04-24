class Camera {
  constructor(position = new Vector2(0,0)) {
    this.position = position;
    this.width = 640;
    this.height = 480;
  }

  physics(){
    this.position = new Vector2(
      player.position.x + (player.getVelocity().x * 2) - (camera.width / 2),
      player.position.y + (player.getVelocity().y * 2) - (camera.height / 2)
    );
  }

  keyDown(event) {
  }

  keyUp(event) {
  }
}