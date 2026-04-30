class Room {
  constructor(player = new Player(), walls = [], coins = []) {
    this.player = player;
    this.player.walls = walls;
    this.player.coins = coins;
    this.walls = walls;
    this.coins = coins;
  }

  physics(delta){
    this.player.physics(delta);
  }

  draw(delta){
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, camera.width, camera.height);

    for(let wall_id in this.walls){
      this.walls[wall_id].draw();
    }

    for(let coin_id in this.coins){
      this.coins[coin_id].draw();
    }

    this.player.draw(delta);
  }

  keyDown(event){
    this.player.keyDown(event);
  }

  keyUp(event){
    this.player.keyUp(event);
  }
}