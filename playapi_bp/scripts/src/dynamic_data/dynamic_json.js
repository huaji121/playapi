import { DynamicData as s } from "./dynamic_data.js";
class n {
  dynamic_data;
  constructor(t, a, i) {
    this.dynamic_data = new s(
      t,
      a,
      i == null ? void 0 : JSON.stringify(i)
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
  update(t) {
    const a = this.get();
    a != null && this.set(t(a));
  }
}
export {
  n as DynamicJson
};
