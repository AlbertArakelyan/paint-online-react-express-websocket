import Tool from './Tool';

class Brush extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  // Handlera
  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;

  }

  mouseDownHandler(e) {
    // TODO turn off also on mouseleave
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  // Functions
  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    console.log('draw brush');
  }
}

export default Brush;