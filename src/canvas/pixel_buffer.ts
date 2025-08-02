import {
  type Dimension,
  type MolangVariableMap,
  type RGB,
  type Vector3,
} from "@minecraft/server";
import {
  drawPixel,
  getPixelOptionsValue,
  type IPixelOptions,
} from "./draw_pixel";
import { VECTOR3_UP, Vector3Utils } from "@minecraft/math";
import { OVERWORLD_V } from "../util/dimensions";

export class PixelBuffer {
  width: number;
  height: number;
  data: Array<Array<RGB>>;
  options: IPixelOptions;
  //缓存偏移的数据
  pixelOffsetArrayBuffer: Array<Array<Vector3>>;
  molangVariableMapBuffer: MolangVariableMap;

  constructor(
    width: number,
    height: number,
    options: IPixelOptions,
    background: RGB = { red: 1.0, green: 1.0, blue: 1.0 }
  ) {
    this.width = width;
    this.height = height;
    this.data = Array.from({ length: height }, () =>
      new Array(width).fill(background)
    );
    this.options = options;
    this.pixelOffsetArrayBuffer = Array.from(
      { length: height },
      () => new Array(width)
    );
    this.molangVariableMapBuffer = getPixelOptionsValue(options);
    this.rotate(options.rotation, 0.01);
  }

  rotate(rotation: Vector3, distanceFromSurface: number) {
    //一定要赋值
    this.options.rotation = rotation;
    this.molangVariableMapBuffer.setVector3("variable.rotation", rotation);

    const localRight = Vector3Utils.normalize(
      Vector3Utils.cross(rotation, VECTOR3_UP)
    );
    const localDown = Vector3Utils.normalize(
      Vector3Utils.cross(rotation, localRight)
    );

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const offset = Vector3Utils.add(
          Vector3Utils.scale(localRight, this.options.size.x * 2 * j),
          Vector3Utils.add(
            Vector3Utils.scale(localDown, this.options.size.y * 2 * i),
            Vector3Utils.scale(rotation, distanceFromSurface)
          )
        );

        this.pixelOffsetArrayBuffer[i][j] = offset;
      }
    }
  }

  drawOnce(loc: Vector3, dim: Dimension | undefined = OVERWORLD_V.value) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.molangVariableMapBuffer.setColorRGB(
          "variable.color",
          this.data[i][j]
        );
        drawPixel(
          Vector3Utils.add(loc, this.pixelOffsetArrayBuffer[i][j]),
          this.molangVariableMapBuffer,
          dim
        );
      }
    }
  }
}
