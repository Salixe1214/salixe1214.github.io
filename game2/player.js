class Player {
  constructor(position = new Vector2(0,0)) {
    this.position = new Vector2(
      position.x - camera.position.x,
      position.y - camera.position.y
    );
    this.velocity = new Vector2(0,0);
    this.surface = "air";
    this.rad = 40
    this.speed = 500;
    this.jumpSpeedModif = 3;
    this.gravity = 9807/(2 * 2);
    this.collectedCoins = 0;
    this.canJump = false;
    this.pressedKeys = {}
  }

  physics() {
    if(!this.isOnGround())this.velocity.y += this.gravity * delta;
    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;

    this.wallCollide();
    this.coinsCollide();

    if(this.position.y > 600){
      this.position = new Vector2(640/2, 480/2);
    }
  }

  draw() {
    let drawPosition = new Vector2(
      this.position.x - camera.position.x,
      this.position.y - camera.position.y
    );

    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(drawPosition.x, drawPosition.y, this.rad, 0, 2 * Math.PI);
    ctx.fill()
    ctx.arc(drawPosition.x, drawPosition.y, this.rad-1, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Coins: " + this.collectedCoins, 15, 45);
  }

  wallCollide() {
    this.surface = "air";
    for(let id in walls){
      let collision = walls[id].collision(this.position, this.rad);
      if(walls[id].floor || walls[id].ceil){
        this.velocity.y = 0;
        if(walls[id].floor){
          this.surface = "floor";
        }
        if(walls[id].ceil){
          this.surface = "ceil";
        }
        this.position.y = collision.y;
      }else{
        if(walls[id].right){
          this.surface = "right";
        }
        if(walls[id].left){
          this.surface = "left";
        }
        this.position.x = collision.x;
      }
    }
  }

  coinsCollide() {
    for(let id in coins){
      if(
        coins[id].is_inside(
          this.position, this.rad,
          new Vector2(this.velocity.x * delta,
            this.velocity.y * delta
          )
        )
      ){
        this.collectedCoins += 1;
        coins[id].collected();
      }
    }
  }

  isOnGround() {
    for(let i in walls){
      if(walls[i].floor){
        this.surface = "floor"
        this.canJump = true;
        return true;
      }
    }
    return false;
  };

  getVelocity() {
    return new Vector2(this.velocity.x * delta, this.velocity.y * delta);
  }

  keyDown(event) {
    if(
      (event.code === 'KeyW' || event.code === "Space") &&
      this.canJump &&
      !this.pressedKeys[event.code]
    ){
      this.canJump = false;
      this.velocity.y = -this.speed * this.jumpSpeedModif;
    }
    if(event.code === 'KeyA'){
      this.velocity.x = -this.speed;
    }
    if(event.code === 'KeyS'){
      this.velocity.y = this.speed;
    }
    if(event.code === 'KeyD'){
      this.velocity.x = this.speed;
    }
    this.pressedKeys[event.code] = true;
  }

  keyUp(event) {
    if(event.code === 'KeyW' || event.code === "Space"){
      this.canJump = false;
      this.velocity.y = this.velocity.y < 0 ? 0 : this.velocity.y;
    }
    if(event.code === 'KeyA'){
      this.velocity.x = this.velocity.x < 0 ? 0 : this.velocity.x;
    }
    if(event.code === 'KeyS'){
      this.velocity.y = this.velocity.y > 0 ? 0 : this.velocity.y;
    }
    if(event.code === 'KeyD'){
      this.velocity.x = this.velocity.x > 0 ? 0 : this.velocity.x;
    }
    this.pressedKeys[event.code] = false;
  }
}