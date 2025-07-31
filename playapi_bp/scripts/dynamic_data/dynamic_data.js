class r {
  id;
  target;
  constructor(t, e, i) {
    this.id = e, this.target = t, i != null && this.get() == null && this.set(i);
  }
  get() {
    return this.target.getDynamicProperty(this.id);
  }
  set(t) {
    this.target.setDynamicProperty(this.id, t);
  }
  free() {
    this.set(void 0);
  }
}
export {
  r as DynamicData
};
