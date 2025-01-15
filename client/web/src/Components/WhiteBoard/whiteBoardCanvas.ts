import {
  Line,
  Rectangle,
  LineDrawing,
} from "Components/WhiteBoard/whiteBoardShapes";

function isMouseInsideRectangle(
  mouseX,
  mouseY,
  rectX,
  rectY,
  rectWidth,
  rectHeight,
) {
  return (
    mouseX >= rectX &&
    mouseX <= rectX + rectWidth &&
    mouseY >= rectY &&
    mouseY <= rectY + rectHeight
  );
}

const isCursorWithInTheElement = (curentX, curentY, element) => {
  const x1 = curentX;
  const y1 = curentY;
  const x2 = element.x;
  const y2 = element.y;

  const type = element.type;

  if (type === "rectangle") {
    const rectWidth = element.width;
    const rectHeight = element.height;
    return isMouseInsideRectangle(x1, y1, x2, y2, rectWidth, rectHeight);
  }
  return false;
};

export class WhiteBoardCanvas {
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
  drawingsHistory: any[];
  prevCanvasWidth: number;
  prevCanvasHeight: number;
  currentAction: string;
  square: string;
  circle: string;
  line: string;
  shortTermDrawingMemory: any[];
  currentElement: any;
  setDrawingsHistory: any;
  cursor: string;
  selectedElement: boolean;
  actionDrawRectangle: string;
  actionDrawLine: string;
  actionDrawCircle: string;
  actionCursorSelected: string;
  panoffsetX: number;
  panoffsetY: number;
  scaleOffsetX: number;
  scaleOffsetY: number;
  actionZoomIn: string;
  actionZoomOut: string;
  pressedKeys: any;
  setCurrentScale: any;
  actionDrawDirection: string;
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
    this.scaleOffsetX = 1;
    this.scaleOffsetY = 1;
    this.prevCanvasWidth = 0;
    this.prevCanvasHeight = 0;
    this.currentElement = null;
    this.panoffsetX = 50;
    this.panoffsetY = 50;

    this.shortTermDrawingMemory = [];
    this.pressedKeys = new Set();

    this.currentAction = "actionCursorSelected";
    this.actionZoomIn = "actionZoomIn";
    this.actionZoomOut = "actionZoomOut";
    this.actionDrawRectangle = "actionDrawRectangle";
    this.actionDrawCircle = "actionActionCircle";
    this.actionDrawLine = "actionDrawLine";
    this.actionCursorSelected = "actionCursorSelected";
    this.actionDrawDirection = "actionDrawDirection";

    // this is the point
    this.cursorX = 0;
    this.cursorY = 0;
    this.prevCursorY = 0;
    this.prevCursorX = 0;

    this.offsetX = 0;
    this.offsetY = 0;

    this.drawingsHistory = [];

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);

    this.toScreenX = this.toScreenX.bind(this);
    this.toScreenY = this.toScreenY.bind(this);
    this.toTrueX = this.toTrueX.bind(this);
    this.toTrueY = this.toTrueY.bind(this);
    this.trueHeight = this.trueHeight.bind(this);
    this.trueWidth = this.trueWidth.bind(this);
  }

  updateKeys(keys) {
    this.pressedKeys = keys;
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

  init(canvas, setCurrentScale) {
    this.canvas = canvas;
    this.pencil = this.canvas.getContext("2d");
    this.setCurrentScale = setCurrentScale;
    this.pencil.lineJoin = "round";
    this.pencil.lineCap = "round";

    // this.canvas.oncontextmenu = function () {
    //   return false;
    // };

    // Mouse Event Handlers
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("mouseup", this.onMouseUp, false);
    this.canvas.addEventListener("mouseout", this.onMouseUp, false);
    this.canvas.addEventListener("wheel", this.onMouseWheel, false);
    this.canvas.addEventListener("mousemove", this.onMouseMove, false);

    // Touch Event Handlers

    this.canvas.addEventListener("touchend", this.onTouchEnd);
    this.canvas.addEventListener("touchcancel", this.onTouchEnd);
    this.canvas.addEventListener("touchmove", this.onTouchMove);

    // if the window changes size, redraw the canvas
  }

  getMousePosition(event) {
    const curentX =
      (event.offsetX - this.panoffsetX * this.scale + this.scaleOffsetX) /
      this.scale;
    const curentY =
      (event.offsetY - this.panoffsetY * this.scale + this.scaleOffsetY) /
      this.scale;
    // console.log(this.panoffsetX, this.panoffsetY)
    return { curentX, curentY };
  }

  onMouseMove(event) {
    const { curentX, curentY } = this.getMousePosition(event);

    // console.log(curentX, curentY)

    if (this.isDrawing) {
      if (this.currentAction === this.actionDrawLine) {
        this.handleCreateDrawing(curentX, curentY);
      } else if (this.currentAction === this.actionDrawRectangle) {
        this.handleRectangle(curentX, curentY);
      } else if (this.currentAction === this.actionDrawDirection) {
        this.handleCreateDirection(curentX, curentY);
      } else if (
        this.actionCursorSelected === this.currentAction &&
        this.selectedElement
      ) {
        this.handleGrabElement(curentX, curentY, this.selectedElement);
      }
      this.prevCursorX = curentX;
      this.prevCursorY = curentY;
      this.redraw(); // Move redraw outside of the drawing methods
    }
  }
  handleCreateDrawing(curentX, curentY) {
    const prevX = this.prevCursorX;
    const prevY = this.prevCursorY;
    if (this.currentElement) {
      this.currentElement.addLine(prevX, prevY, curentX, curentY);
    } else {
      const drawing = new LineDrawing(this.pencil);
      drawing.addLine(prevX, prevY, curentX, curentY);
      this.drawingsHistory.push([drawing]);
      this.currentElement = drawing;
    }
  }
  handleRectangle(curentX, curentY) {
    if (this.currentElement) {
      this.currentElement.updateSize(curentX, curentY);
    } else {
      const rectangle = new Rectangle(curentX, curentY, 0, 0, this.pencil);
      this.drawingsHistory.push([rectangle]);
      this.currentElement = rectangle;
    }
  }

  handleCreateDirection(curentX, curentY) {
    const preX = this.prevCursorX;
    const preY = this.prevCursorY;
    if (this.currentElement) {
      this.currentElement.update(curentX, curentY);
    } else {
      const LineDirection = new Line(preX, preY, curentX, curentY, this.pencil);
      this.drawingsHistory.push([LineDirection]);
      this.currentElement = LineDirection;
    }
  }

  handleGrabElement(curentX, curentY, element) {
    const newX = curentX - element.offsetX;
    const newY = curentY - element.offsetY;

    element.update(newX, newY, element.width, element.height);
    this.redraw();
  }

  handleSelecteElement(curentX, curentY) {
    for (let elements of this.drawingsHistory) {
      if (elements.length === 1) {
        const element = elements[0];
        const inInside = isCursorWithInTheElement(curentX, curentY, element);
        if (inInside) {
          element.offsetX = curentX - element.x;
          element.offsetY = curentY - element.y;
          this.selectedElement = element;
        }
      }
    }
  }

  onTouchEnd() {
    // this.singleTouch = false;
    // this.doubleTouch = false;
  }

  onTouchMove(event) {
    const curentX = event.clientX;
    const curentY = event.clientY;
  }

  onMouseDown(event) {
    this.isDrawing = true;
    const { curentX, curentY } = this.getMousePosition(event);
    [this.prevCursorX, this.prevCursorY] = [curentX, curentY];
    if (this.currentAction === this.actionCursorSelected) {
      this.handleSelecteElement(curentX, curentY);
      document.body.style.cursor = "move";
    }
  }

  onMouseUp() {
    if (this.currentAction === this.actionCursorSelected) {
      document.body.style.cursor = "default";
    }
    this.isDrawing = false;
    this.currentElement = null;
    if (this.shortTermDrawingMemory.length) {
      this.drawingsHistory.push([...this.shortTermDrawingMemory]);
    }
    this.shortTermDrawingMemory = [];
    this.selectedElement = null;
  }

  onMouseWheel(event) {
    event.preventDefault();
    const deltaX = event.deltaX;
    const deltaY = event.deltaY;
    if (this.pressedKeys.has("Meta") || this.pressedKeys.has("Control")) {
      this.zoom(event.deltaY * -0.01);
    } else {
      this.panoffsetX -= deltaX;
      this.panoffsetY -= deltaY;
    }

    this.redraw();
  }

  resize({ width, height }) {
    this.prevCanvasWidth = width;
    this.prevCanvasHeight = height;
    if (this.canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.redraw();
    }
  }

  //new functions

  undo() {
    this.drawingsHistory.pop();
    this.redraw();
  }

  redraw() {
    this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pencil.save();
    this.pencil.translate(
      this.panoffsetX * this.scale - this.scaleOffsetX,
      this.panoffsetY * this.scale - this.scaleOffsetY,
    ); // Translate the context

    this.pencil.scale(this.scale, this.scale);

    for (let shapes of this.drawingsHistory) {
      for (let shape of shapes) {
        shape.draw();
      }
    }
    this.pencil.restore(); // Restore the context state (removes the translation)
  }

  zoom(delta) {
    const newScale = Math.min(Math.max(this.scale + delta, 0.1), 20);
    this.scale = newScale;
    const scaledWidth = this.canvas.width * this.scale;
    const scaledHeight = this.canvas.height * this.scale;
    this.scaleOffsetX = (scaledWidth - this.canvas.width) / 2;
    this.scaleOffsetY = (scaledHeight - this.canvas.height) / 2;
    this.setCurrentScale(newScale);
    this.redraw();
  }

  updateAction(shape) {
    this.currentAction = shape;
    if (this.currentAction === this.actionDrawLine) {
      document.body.style.cursor = "crosshair";
    } else if (this.currentAction === this.actionCursorSelected) {
      document.body.style.cursor = "default";
    }
  }

  clearCanvas() {
    const width = this.prevCanvasWidth;
    const height = this.prevCanvasHeight;
    this.pencil.clearRect(0, 0, width, height);
  }
}

//learn canvas
export const whiteBoardCanvas = new WhiteBoardCanvas();

class WhiteBoardEnum {
  actionDrawRectangle: string;
  actionDrawLine: string;
  actionDrawCircle: string;
  actionCursorSelected: string;
  actionZoomIn: string;
  actionZoomOut: string;
  actionResetZoom: string;
  actionDrawDirection: string;
  constructor() {
    this.actionZoomIn = "actionZoomIn";
    this.actionZoomOut = "actionZoomOut";
    this.actionResetZoom = "actionResetZoom";
    this.actionDrawRectangle = "actionDrawRectangle";
    this.actionDrawCircle = "actionActionCircle";
    this.actionDrawLine = "actionDrawLine";
    this.actionDrawDirection = "actionDrawDirection";
    this.actionCursorSelected = "actionCursorSelected";
  }
}

export const whiteBoardEnum = new WhiteBoardEnum();
