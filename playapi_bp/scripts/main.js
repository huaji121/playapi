import { world as e, system as r } from "@minecraft/server";
import { DynamicJson as t } from "./dynamic_data/dynamic_json.js";
import { deferredRegister as a } from "./deferred_register/deferred_register.js";
const n = a.register(
  () => new t(e, "test", { a: 1 })
);
e.afterEvents.chatSend.subscribe((s) => {
  e.sendMessage(s.sender.name + "123");
});
r.afterEvents.scriptEventReceive.subscribe((s) => {
  switch (s.id) {
    case "a:t1":
      e.sendMessage("Test"), e.sendMessage(`${n.value?.get_raw()}`);
      break;
  }
});
