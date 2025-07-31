import { system, world } from "@minecraft/server";
import { DynamicJson } from "./dynamic_data/dynamic_json";
import { deferredRegister } from "./deferred_register/deferred_register";
import { MinecraftItemTypes } from "@minecraft/vanilla-data";

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

    default:
      break;
  }
});
