import type { RGB, Vector2, Vector3 } from "@minecraft/server";

export class PixelBuffer {
  data: Array<Array<RGB>>;
  width: number;
  height: number;
  constructor(w: number, h: number, background: RGB) {
    this.width = w;
    this.height = h;
    this.data = Array.from({ length: h }, () =>
      new Array<RGB>(w).fill(background)
    );
  }

  public drawPixel(loc: Vector2, color: RGB) {
    this.data[loc.y][loc.x] = color;
  }

  public drawLine(loc1: Vector3, loc2: Vector3, color: RGB) {}

  public clear(color: RGB) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.drawPixel({ x: j, y: i }, color);
      }
    }
  }
}
