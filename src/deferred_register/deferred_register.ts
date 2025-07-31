import { world } from "@minecraft/server";
import type { Subscriber } from "../event_holder";

export class DeferredValue<T> {
  value?: T;
  constructor() {}
}

export class DeferredRegister {
  callbacks: Array<() => void>;
  constructor(register: Subscriber = world.afterEvents.worldLoad) {
    this.callbacks = [];
    register.subscribe(() => {
      for (let callback of this.callbacks) {
        callback();
      }
    });
  }

  register<T>(callback: () => T) {
    let result = new DeferredValue<T>();
    this.callbacks.push(() => {
      result.value = callback();
    });
    return result;
  }
}

export const deferredRegister = new DeferredRegister();
