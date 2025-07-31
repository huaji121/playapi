import { system, world } from "@minecraft/server";
import { DynamicJson } from "./dynamic_data/dynamic_json";
import { deferredRegister } from "./deferred_register/deferred_register";
import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import { OVERWORLD_V } from "./util/dimensions";

const value = deferredRegister.register(
  () => new DynamicJson(world, "test", { a: 2 })
);

world.afterEvents.chatSend.subscribe((e) => {
  world.sendMessage(e.sender.name);
});

system.afterEvents.scriptEventReceive.subscribe((e) => {
  switch (e.id) {
    case "dbg:t1":
      world.sendMessage("Test");
      world.sendMessage(`${value.value?.get_raw()}`);
      break;

    case "dbg:t2":
      world.sendMessage("Test");
      value.value?.update((obj) => {
        obj.a += 1;
        return obj;
      });
      world.sendMessage(`${value.value?.get_raw()}`);
      break;

    case "dbg:t3":
      world.sendMessage(MinecraftItemTypes.AcaciaBoat);
      break;

    case "dbg:t4":
      system.runInterval(() => {
        // world.sendMessage("Test");
        for (let i = 0; i < 64; i++) {
          for (let j = 0; j < 64; j++) {
            OVERWORLD_V.value?.spawnParticle("playapi:pixel", {
              x: 0 + i * (1 / 54),
              y: -59 - j * (1 / 54),
              z: 0.01,
            });
          }
        }
        world.sendMessage("刷新一次");
      }, 10);
      break;

    default:
      break;
  }
});
