import { system, world } from "@minecraft/server";
import { DynamicJson } from "./dynamic_data/dynamic_json";
import { deferredRegister } from "./deferred_register/deferred_register";
import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import {
  defaultPixelOptions,
  drawPixel,
  getPixelOptionsValue,
} from "./canvas/draw_pixel";
import { PixelBufferDrawer } from "./canvas/pixel_buffer_drawer";

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
      break;

    case "dbg:t5":
      world.sendMessage("开始");
      let pixelBufferDrawer = new PixelBufferDrawer(32, 32, {
        ...defaultPixelOptions,
        rotation: { x: 0, y: 0, z: 1 },
        size: { x: 0.5 / 16, y: 0.5 / 16 },
      });

      pixelBufferDrawer.pixelBuffer.clear({ red: 0.5, green: 0.5, blue: 0.5 });
      pixelBufferDrawer.pixelBuffer.drawPixel(
        { x: 24, y: 31 },
        { red: 1, green: 0, blue: 1 }
      );

      system.runInterval(() => {
        pixelBufferDrawer.drawOnce({ x: -1, y: -58, z: -1 });
      }, 1.5 * 20);

      break;

    case "dbg:t6":
      break;

    default:
      break;
  }
});
