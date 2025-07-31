import { world as e, system as n } from "@minecraft/server";
import { DynamicJson as i } from "./dynamic_data/dynamic_json.js";
import { deferredRegister as d } from "./deferred_register/deferred_register.js";
import { MinecraftItemTypes as c } from "../node_modules/@minecraft/vanilla-data/lib/index.js";
import { OVERWORLD_V as g } from "./util/dimensions.js";
const t = d.register(
  () => new i(e, "test", { a: 2 })
);
e.afterEvents.chatSend.subscribe((a) => {
  e.sendMessage(a.sender.name);
});
n.afterEvents.scriptEventReceive.subscribe((a) => {
  switch (a.id) {
    case "dbg:t1":
      e.sendMessage("Test"), e.sendMessage(`${t.value?.get_raw()}`);
      break;
    case "dbg:t2":
      e.sendMessage("Test"), t.value?.update((s) => (s.a += 1, s)), e.sendMessage(`${t.value?.get_raw()}`);
      break;
    case "dbg:t3":
      e.sendMessage(c.AcaciaBoat);
      break;
    case "dbg:t4":
      n.runInterval(() => {
        for (let s = 0; s < 64; s++)
          for (let r = 0; r < 64; r++)
            g.value?.spawnParticle("playapi:pixel", {
              x: 0 + s * (1 / 54),
              y: -59 - r * (1 / 54),
              z: 0.01
            });
        e.sendMessage("刷新一次");
      }, 10);
      break;
  }
});
