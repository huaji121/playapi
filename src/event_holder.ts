type EventCallbackType = (arg0: any) => void;

export interface Subscriber {
  subscribe(callback: EventCallbackType, options?: any): EventCallbackType;
  unsubscribe(callback: EventCallbackType): void;
}

//事件开关
export class EventHolder {
  subscriber: Subscriber;
  event_callback: EventCallbackType;

  constructor(subscriber: Subscriber, callback: EventCallbackType) {
    this.subscriber = subscriber;
    this.event_callback = callback;
  }

  enable(options?: any) {
    this.subscriber.subscribe(this.event_callback, options);
  }
  disable() {
    this.subscriber.unsubscribe(this.event_callback);
  }
}
