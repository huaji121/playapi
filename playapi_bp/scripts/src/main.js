import { world as e, system as r } from "@minecraft/server";
import { DynamicJson as n } from "./dynamic_data/dynamic_json.js";
import { deferredRegister as d } from "./deferred_register/deferred_register.js";
import { MinecraftItemTypes as i } from "../node_modules/@minecraft/vanilla-data/lib/index.js";
const a = d.register(
  () => new n(e, "test", { a: 2 })
);
e.afterEvents.chatSend.subscribe((s) => {
  e.sendMessage(s.sender.name);
});
r.afterEvents.scriptEventReceive.subscribe((s) => {
  switch (s.id) {
    case "dbg:t1":
      e.sendMessage("Test"), e.sendMessage(`${a.value?.get_raw()}`);
      break;
    case "dbg:t2":
      e.sendMessage("Test"), a.value?.update((t) => (t.a += 1, t)), e.sendMessage(`${a.value?.get_raw()}`);
      break;
    case "dbg:t3":
      e.sendMessage(i.AcaciaBoat);
      break;
  }
});
