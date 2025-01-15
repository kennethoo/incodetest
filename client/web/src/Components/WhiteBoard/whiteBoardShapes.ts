export class Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  pencil: any;
  type: string;
  strokeColor: string;
  constructor(x1, y1, x2, y2, pencil) {
    this.type = "line";
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.pencil = pencil;

    this.draw = this.draw.bind(this);
  }

  draw() {
    this.pencil.beginPath();
    this.pencil.moveTo(this.x1, this.y1);
    this.pencil.lineTo(this.x2, this.y2);
    this.pencil.strokeStyle = "#000";
    this.pencil.lineWidth = 2;
    this.pencil.stroke();
  }

  update(x2, y2) {
    this.x2 = x2;
    this.y2 = y2;
  }
}

export class Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  pencil: any;
  type: string;
  maxAreaWith: number;
  maxAreaHegight: number;
  redraw: any;
  strokeColor: string;
  constructor(x, y, width, height, pencil) {
    this.type = "rectangle";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.pencil = pencil;
    this.draw = this.draw.bind(this);
    this.updateSize = this.updateSize.bind(this);

    this.maxAreaWith = 0;
    this.maxAreaHegight = 0;
  }

  draw() {
    this.pencil.beginPath();
    this.pencil.strokeStyle = 2;
    this.pencil.strokeStyle = "#000";
    this.pencil.strokeRect(this.x, this.y, this.width, this.height);
  }
  update(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.draw();
  }

  updateSize(x, y) {
    const width = x - this.x;
    const height = y - this.y;
    this.width = width;
    this.height = height;
  }
}

export class LineDrawing {
  allLine: any[];
  type: string;
  pencil: any;
  strokeColor: string;
  constructor(pencil) {
    this.pencil = pencil;
    this.type = "drawing";
    this.allLine = [];
  }
  draw() {
    for (let line of this.allLine) {
      line.draw();
    }
  }

  addLine(prevX, prevY, curentX, curentY) {
    const line = new Line(prevX, prevY, curentX, curentY, this.pencil);
    this.allLine.push(line);
    // line.draw();
  }
}
