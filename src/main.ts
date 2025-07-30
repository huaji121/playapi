import { world } from "@minecraft/server";

world.afterEvents.chatSend.subscribe((e) => {
  world.sendMessage(e.sender.name);
});
