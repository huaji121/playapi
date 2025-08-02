import { system, world } from "@minecraft/server";
import { DynamicJson } from "./dynamic_data/dynamic_json";
import { deferredRegister } from "./deferred_register/deferred_register";
import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import {
  defaultPixelOptions,
  drawPixel,
  getPixelOptionsValue,
} from "./canvas/draw_pixel";
import { PixelBuffer } from "./canvas/pixel_buffer";

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

        const config = getPixelOptionsValue({
          ...defaultPixelOptions,
          lifetime: 1.5,
        });

        for (let i = 0; i < 64; i++) {
          for (let j = 0; j < 64; j++) {
            drawPixel(
              {
                x: 0 + 0.5 / 64 + i * (1 / 64),
                y: -59 - 0.5 / 64 - j * (1 / 64),
                z: 0.01,
              },
              config
            );
          }
        }

        world.sendMessage("刷新一次");
      }, 1.5 * 20);
      break;

    case "dbg:t5":
      world.sendMessage("开始");
      let pixelBuffer = new PixelBuffer(64, 64, {
        ...defaultPixelOptions,
        rotation: { x: 0, y: 1, z: 5 },
      });

      system.runInterval(() => {
        pixelBuffer.drawOnce({ x: 0, y: -59, z: 0 });
      }, 1.5 * 20);

      break;

    case "dbg:t6":
      break;

    default:
      break;
  }
});
