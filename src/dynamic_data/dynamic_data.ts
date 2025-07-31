import type { Vector3 } from "@minecraft/server";
import type { IDynamicPropertyTarget } from "./idynamic_property_target";

export type DynamicPropertyValueType =
  | boolean
  | number
  | string
  | Vector3
  | undefined;

export class DynamicData<T extends DynamicPropertyValueType> {
  id: string;
  target: IDynamicPropertyTarget;

  constructor(target: IDynamicPropertyTarget, id: string, value?: T) {
    this.id = id;
    this.target = target;
    if (value != undefined) {
      if (this.get() == undefined) {
        this.set(value);
      }
    }
  }

  get(): T {
    return this.target.getDynamicProperty(this.id) as T;
  }
  set(value: T): void {
    this.target.setDynamicProperty(this.id, value);
  }
  free(): void {
    this.set(undefined as T);
  }
}
