import { world as e } from "@minecraft/server";
e.afterEvents.chatSend.subscribe((s) => {
  e.sendMessage(s.sender.name);
});
