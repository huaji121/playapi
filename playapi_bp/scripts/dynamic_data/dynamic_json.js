import { DynamicData as s } from "./dynamic_data.js";
class n {
  dynamic_data;
  constructor(t, i, a) {
    this.dynamic_data = new s(
      t,
      i,
      a == null ? void 0 : JSON.stringify(a)
    );
  }
  get() {
    const t = this.get_raw();
    if (t != null) return JSON.parse(t);
  }
  get_raw() {
    return this.dynamic_data?.get();
  }
  set(t) {
    this.set_raw(JSON.stringify(t));
  }
  set_raw(t) {
    this.dynamic_data?.set(t);
  }
  free() {
    this.dynamic_data?.free();
  }
  with_set(t) {
    const i = this.get();
    i != null && this.set(t(i));
  }
}
export {
  n as DynamicJson
};
