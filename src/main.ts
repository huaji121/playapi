import { system, world } from "@minecraft/server";
import { DynamicJson } from "./dynamic_data/dynamic_json";
import { deferredRegister } from "./deferred_register/deferred_register";

const value = deferredRegister.register(
  () => new DynamicJson(world, "test", { a: 1 })
);

world.afterEvents.chatSend.subscribe((e) => {
  world.sendMessage(e.sender.name);
});

system.afterEvents.scriptEventReceive.subscribe((e) => {
  switch (e.id) {
    case "a:t1":
      world.sendMessage("Test");
      world.sendMessage(`${value.value?.get_raw()}`);
      break;

    default:
      break;
  }
});
