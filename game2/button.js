class Button{
  constructor(
    method,
    text = "",
    position = new Vector2(0,0),
    dim = new Vector2(0,0),
    fill_color = "green",
    hover_color = "grey",
    click_color = "blue",
    rim_color = "black"
  ) {
    this.start = new Vector2(position.x - (dim.x / 2), position.y - (dim.y / 2));
    this.end = new Vector2(position.x + (dim.x / 2), position.y + (dim.y / 2));
    this.color = fill_color;  // The active color
    this.hover_color = hover_color;
    this.click_color = click_color;
    this.fill_color = fill_color;
    this.rim_color = rim_color;
    this.mouse_in = false;
    this.method = method;
    this.text = text;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.rim_color;
    ctx.fillRect(
      this.start.x + 5,
      this.start.y + 5,
      this.end.x - this.start.x - 10,
      this.end.y - this.start.y - 10
    );
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.lineTo(this.start.x, this.end.y);
    ctx.lineTo(this.start.x, this.start.y);
    ctx.stroke();

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(
      this.text,
      this.start.x + ((this.end.x - this.start.x) / 2),
      this.start.y + ((this.end.y - this.start.y) / 2)
    );
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
  }

  is_inside(pos = new Vector2(0,0)) {
    if(pos.x < this.end.x && pos.x > this.start.x){
      return (pos.y < this.end.y && pos.y > this.start.y);
    }
    return false;
  }

  onClick(event) {
    let mouse_pos = new Vector2(event.offsetX, event.offsetY);
    if (this.is_inside(mouse_pos)) {
      this.color = this.click_color;
    }
  }

  mouseUp(event) {
    let mouse_pos = new Vector2(event.offsetX, event.offsetY);
    this.color = this.fill_color;
    if (this.is_inside(mouse_pos)) {
      this.method();
    }
  }

  onMouseMove(event) {
    let mouse_pos = new Vector2(event.offsetX, event.offsetY);
    if (this.is_inside(mouse_pos)) {
      // Do things
      this.mouse_in = true;
      this.color = this.hover_color;
    } else {
      this.mouse_in = false;
      this.color = this.fill_color;
    }
  }
}