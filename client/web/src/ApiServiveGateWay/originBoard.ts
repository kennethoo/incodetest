//i guess i have a couples of options here
//I one talk to the co host about some of the  situarion ?ttuiantion rally really closelly ``teh sioriung
// I Liead ? wi can't let's be honest but hhow much honest should i be lol
// i should not be too honest nno nogt get people too worroes but definbely she is mono
// i am acing a liitle string , usually i will be oveerthere next to them just talking
//  bbut i a herr sjudt working acting like i am working niceeee
// fuck me at his poiunt  when you look ar me like that it si  cr4agdf y fh s    r- i ki
//d i liove rthsi code

class WhiteBoardCanvas {
  canvas: any;
  pencil: any;
  isDrawing: boolean;
  singleTouch: boolean;
  doubleTouch: boolean;
  prevTouches: any[];
  leftMouseDown: boolean;
  rightMouseDown: boolean;
  scale: number;
  cursorX: number;
  cursorY: number;
  prevCursorY: number;
  prevCursorX: number;
  offsetX: number;
  offsetY: number;
  drawings: any[];
  prevCanvasWidth: number;
  prevCanvasHeight: number;
  constructor() {
    this.canvas = null;
    this.pencil = null;
    this.isDrawing = false;
    this.singleTouch = true;
    this.doubleTouch = false;
    this.prevTouches = [null, null];
    this.leftMouseDown = false;
    this.rightMouseDown = false;
    this.scale = 1;
    this.prevCanvasWidth = 0;
    this.prevCanvasHeight = 0;

    // this is the point
    this.cursorX = 0;
    this.cursorY = 0;
    this.prevCursorY = 0;
    this.prevCursorX = 0;

    this.offsetX = 0;
    this.offsetY = 0;

    this.drawings = [];

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.drawLine = this.drawLine.bind(this);

    this.toScreenX = this.toScreenX.bind(this);
    this.toScreenY = this.toScreenY.bind(this);
    this.toTrueX = this.toTrueX.bind(this);
    this.toTrueY = this.toTrueY.bind(this);
    this.trueHeight = this.trueHeight.bind(this);
    this.trueWidth = this.trueWidth.bind(this);
    this.newWeell = this.newWeell.bind(this);
  }

  //helpter methode

  toScreenX(xTrue) {
    return (xTrue + this.offsetX) * this.scale;
  }
  toScreenY(yTrue) {
    return (yTrue + this.offsetY) * this.scale;
  }
  toTrueX(xScreen) {
    return xScreen / this.scale - this.offsetX;
  }
  toTrueY(yScreen) {
    return yScreen / this.scale - this.offsetY;
  }
  trueHeight() {
    return this.canvas.clientHeight / this.scale;
  }
  trueWidth() {
    return this.canvas.clientWidth / this.scale;
  }

  init(canvas) {
    this.canvas = canvas;
    this.pencil = this.canvas.getContext("2d");

    this.canvas.oncontextmenu = function () {
      return false;
    };

    // Mouse Event Handlers
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("mouseup", this.onMouseUp, false);
    this.canvas.addEventListener("mouseout", this.onMouseUp, false);
    this.canvas.addEventListener("mousemove", this.onMouseMove, false);
    this.canvas.addEventListener("wheel", this.newWeell, false);

    // Touch Event Handlers
    this.canvas.addEventListener("touchstart", this.onTouchStart);
    this.canvas.addEventListener("touchend", this.onTouchEnd);
    this.canvas.addEventListener("touchcancel", this.onTouchEnd);
    this.canvas.addEventListener("touchmove", this.onTouchMove);
    this.redrawCanvas({
      width: this.prevCanvasWidth,
      height: this.prevCanvasHeight,
    });

    // if the window changes size, redraw the canvas
  }

  onTouchStart(event) {
    // if (event.touches.length === 1) {
    //   this.singleTouch = true;
    //   this.doubleTouch = false;
    // }
    // if (event.touches.length >= 2) {
    //   this.singleTouch = false;
    //   this.doubleTouch = true;
    // }
    // // store the last touches
    // this.prevTouches[0] = event.touches[0];
    // this.prevTouches[1] = event.touches[1];
    //
  }

  onTouchEnd() {
    // this.singleTouch = false;
    // this.doubleTouch = false;
  }

  onTouchMove(event) {
    // get first touch coordinates
    const touch0X = event.touches[0].pageX;
    const touch0Y = event.touches[0].pageY;
    const prevTouch0X = this.prevTouches[0].pageX;
    const prevTouch0Y = this.prevTouches[0].pageY;

    const scaledX = this.toTrueX(touch0X);
    const scaledY = this.toTrueY(touch0Y);
    const prevScaledX = this.toTrueX(prevTouch0X);
    const prevScaledY = this.toTrueY(prevTouch0Y);

    if (this.singleTouch) {
      // add to history
      this.drawings.push({
        x0: prevScaledX,
        y0: prevScaledY,
        x1: scaledX,
        y1: scaledY,
      });
      this.drawLine(prevTouch0X, prevTouch0Y, touch0X, touch0Y);
    }

    // if (this.doubleTouch) {
    //   // get second touch coordinates
    //   const touch1X = event.touches[1].pageX;
    //   const touch1Y = event.touches[1].pageY;
    //   const prevTouch1X = this.prevTouches[1].pageX;
    //   const prevTouch1Y = this.prevTouches[1].pageY;

    //   // get midpoints
    //   const midX = (touch0X + touch1X) / 2;
    //   const midY = (touch0Y + touch1Y) / 2;
    //   const prevMidX = (prevTouch0X + prevTouch1X) / 2;
    //   const prevMidY = (prevTouch0Y + prevTouch1Y) / 2;

    //   // calculate the distances between the touches
    //   const hypot = Math.sqrt(
    //     Math.pow(touch0X - touch1X, 2) + Math.pow(touch0Y - touch1Y, 2)
    //   );
    //   const prevHypot = Math.sqrt(
    //     Math.pow(prevTouch0X - prevTouch1X, 2) +
    //       Math.pow(prevTouch0Y - prevTouch1Y, 2)
    //   );

    //   // calculate the screen scale change
    //   let zoomAmount = hypot / prevHypot;
    //   this.scale = this.scale * zoomAmount;
    //   const scaleAmount = 1 - zoomAmount;

    //   // calculate how many pixels the midpoints have moved in the x and y direction
    //   const panX = midX - prevMidX;
    //   const panY = midY - prevMidY;
    //   // scale this movement based on the zoom level
    //   this.offsetX += panX / this.scale;
    //   this.offsetY += panY / this.scale;

    //   // Get the relative position of the middle of the zoom.
    //   // 0, 0 would be top left.
    //   // 0, 1 would be top right etc.
    //   var zoomRatioX = midX / this.canvas.clientWidth;
    //   var zoomRatioY = midY / this.canvas.clientHeight;

    //   // calculate the amounts zoomed from each edge of the screen
    //   const unitsZoomedX = this.trueWidth() * scaleAmount;
    //   const unitsZoomedY = this.trueHeight() * scaleAmount;

    //   const unitsAddLeft = unitsZoomedX * zoomRatioX;
    //   const unitsAddTop = unitsZoomedY * zoomRatioY;

    //   this.offsetX += unitsAddLeft;
    //   this.offsetY += unitsAddTop;

    //   this.redrawCanvas({
    //     width: this.prevCanvasWidth,
    //     height: this.prevCanvasHeight,
    //   });
    // }
    this.prevTouches[0] = event.touches[0];
    this.prevTouches[1] = event.touches[1];
  }

  onMouseDown(event) {
    // detect left clicks
    if (event.button === 0) {
      this.leftMouseDown = true;
      this.rightMouseDown = false;
    }
    // detect right clicks
    if (event.button === 2) {
      this.rightMouseDown = true;
      this.leftMouseDown = false;
    }

    // update the cursor coordinates
    this.cursorX = event.pageX;
    this.cursorY = event.pageY;
    this.prevCursorX = event.pageX;
    this.prevCursorY = event.pageY;
  }

  onMouseUp() {
    this.leftMouseDown = false;
    this.rightMouseDown = false;
  }

  onMouseMove(event) {
    // get mouse position
    this.cursorX = event.pageX;
    this.cursorY = event.pageY;
    const scaledX = this.toTrueX(this.cursorX);
    const scaledY = this.toTrueY(this.cursorY);
    const prevScaledX = this.toTrueX(this.prevCursorX);
    const prevScaledY = this.toTrueY(this.prevCursorY);
    if (this.leftMouseDown) {
      // add the line to our drawing history
      this.drawings.push({
        x0: prevScaledX,
        y0: prevScaledY,
        x1: scaledX,
        y1: scaledY,
      });
      // draw a line
      this.drawLine(
        this.prevCursorX,
        this.prevCursorY,
        this.cursorX,
        this.cursorY,
      );
    }
    if (this.rightMouseDown) {
      // move the screen
      this.offsetX += (this.cursorX - this.prevCursorX) / this.scale;
      this.offsetY += (this.cursorY - this.prevCursorY) / this.scale;
      this.redrawCanvas({
        width: this.prevCanvasWidth,
        height: this.prevCanvasHeight,
      });
    }
    this.prevCursorX = this.cursorX;
    this.prevCursorY = this.cursorY;
  }

  onMouseWheel(event) {
    event.preventDefault();
    const deltaY = event.deltaY;
    const scaleAmount = -deltaY / 500;
    this.scale = this.scale * (1 + scaleAmount);

    // zoom the page based on where the cursor is
    var distX = event.pageX / this.canvas.clientWidth;
    var distY = event.pageY / this.canvas.clientHeight;

    // calculate how much we need to zoom
    const unitsZoomedX = this.trueWidth() * scaleAmount;
    const unitsZoomedY = this.trueHeight() * scaleAmount;

    const unitsAddLeft = unitsZoomedX * distX;
    const unitsAddTop = unitsZoomedY * distY;

    this.offsetX -= unitsAddLeft;
    this.offsetY -= unitsAddTop;

    this.redrawCanvas({
      width: this.prevCanvasWidth,
      height: this.prevCanvasHeight,
    });
  }

  resize({ width, height }) {
    this.redrawCanvas({ width, height });
  }

  redrawCanvas({ width, height }) {
    // set the canvas to the size of the window

    this.canvas.width = width;
    this.canvas.height = height;

    this.prevCanvasWidth = width;
    this.prevCanvasHeight = height;

    this.pencil.fillStyle = "#fff";
    this.pencil.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.drawings.length; i++) {
      const line = this.drawings[i];
      this.drawLine(
        this.toScreenX(line.x0),
        this.toScreenY(line.y0),
        this.toScreenX(line.x1),
        this.toScreenY(line.y1),
      );
    }
  }

  drawLine(x0, y0, x1, y1) {
    this.pencil.beginPath();
    this.pencil.moveTo(x0, y0);
    this.pencil.lineTo(x1, y1);
    this.pencil.strokeStyle = "#000";
    this.pencil.lineWidth = 2;
    this.pencil.stroke();
  }

  //new functions

  newWeell(event) {
    event.preventDefault();
    // const panAmountX = event.deltaX;
    // const panAmountY = event.deltaY;

    // this.offsetX += panAmountX;
    // this.offsetY += panAmountY;
    // // Redraw canvas with new scale and offset
    // this.redrawCanvas({
    //   width: this.prevCanvasWidth,
    //   height: this.prevCanvasHeight,
    // });
  }
}

//learn canvas

export default WhiteBoardCanvas;
