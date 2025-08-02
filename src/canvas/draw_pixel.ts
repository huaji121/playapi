import {
  MolangVariableMap,
  type Dimension,
  type RGB,
  type Vector2,
  type Vector3,
} from "@minecraft/server";
import { OVERWORLD_V } from "../util/dimensions";
export interface IPixelOptions {
  color?: RGB;
  lifetime: number;
  size: Vector2;
  rotation: Vector3;
}

export const defaultPixelOptions: IPixelOptions = {
  color: { red: 1.0, green: 1.0, blue: 1.0 },
  lifetime: 2.0,
  size: { x: 0.5 / 64, y: 0.5 / 64 },
  rotation: { x: 0, y: 0, z: 1 },
};

export function getPixelOptionsValue(options: IPixelOptions) {
  const config = new MolangVariableMap();
  if (options.color) config.setColorRGB("variable.color", options.color);
  config.setFloat("variable.lifetime", options.lifetime);
  config.setFloat("variable.sizex", options.size.x);
  config.setFloat("variable.sizey", options.size.y);
  config.setVector3("variable.rotation", options.rotation);

  return config;
}

export function drawPixel(
  loc: Vector3,
  options: MolangVariableMap = getPixelOptionsValue(defaultPixelOptions),
  dim: Dimension | undefined = OVERWORLD_V.value
) {
  dim?.spawnParticle("playapi:pixel", loc, options);
}
