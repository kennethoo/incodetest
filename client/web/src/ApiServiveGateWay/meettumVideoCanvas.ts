export class MeettumCanvas {
  videoElement: any;
  canvas: any;
  ctx: null | any;
  canvasForBackgroundImage: null | any;
  ctx2: null | any;
  animationId: number;
  isStop: Boolean;
  constructor() {
    this.videoElement = null;
    this.canvas = null;
    this.ctx = null;
    this.ctx2 = null;
    this.drawVideo = this.drawVideo.bind(this);
    this.canvasForBackgroundImage = null;
    this.animationId = 0;
    this.isStop = false;
  }

  async initCanvas(video, canvas) {
    this.videoElement = video;
    this.canvas = canvas;
    this.canvas.height = canvas.innerHeight;
    this.canvas.width = canvas.innerWidth;
    this.ctx = this.canvas.getContext("2d");
    this.isStop = false;
    this.videoElement.addEventListener("play", () => {
      this.drawVideo();
    });
  }

  stop() {
    cancelAnimationFrame(this.animationId);
    this.isStop = true;
  }
  resize({ width, height }) {
    if (this.canvas) {
      cancelAnimationFrame(this.animationId);
      this.canvas.width = width;
      this.canvas.height = height;
      this.drawVideo();
    }
  }

  async drawVideo() {
    if (this.videoElement.paused || this.videoElement.ended || this.isStop) {
      return;
    }

    const aspectRatio =
      this.videoElement.videoWidth / this.videoElement.videoHeight;
    let drawWidth = this.canvas.width;
    let drawHeight = this.canvas.height;
    let offsetX = 0;
    let offsetY = 0;
    // Calculate dimensions and offset for "object-fit: contain" effect
    if (this.canvas.width / this.canvas.height > aspectRatio) {
      drawHeight = this.canvas.width / aspectRatio;
      offsetY = -(drawHeight - this.canvas.height) / 2;
    } else {
      drawWidth = this.canvas.height * aspectRatio;
      offsetX = -(drawWidth - this.canvas.width) / 2;
    }

    // Calculate the x and y position to center the video on the canvas

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.videoElement,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight,
    );

    this.animationId = requestAnimationFrame(this.drawVideo);
  }
}

export const meettumCanvas = new MeettumCanvas();
