import { world as l } from "@minecraft/server";
class t {
  value;
  constructor() {
  }
}
class c {
  callbacks;
  constructor(r = l.afterEvents.worldLoad) {
    this.callbacks = [], r.subscribe(() => {
      for (let e of this.callbacks)
        e();
    });
  }
  register(r) {
    let e = new t();
    return this.callbacks.push(() => {
      e.value = r();
    }), e;
  }
}
const o = new c();
export {
  c as DeferredRegister,
  t as DeferredValue,
  o as deferredRegister
};
