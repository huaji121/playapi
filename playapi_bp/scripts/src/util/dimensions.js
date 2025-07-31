import { world as e } from "@minecraft/server";
import { MinecraftDimensionTypes as r } from "../../node_modules/@minecraft/vanilla-data/lib/index.js";
import { deferredRegister as i } from "../deferred_register/deferred_register.js";
const n = i.register(
  () => e.getDimension(r.Overworld)
);
i.register(
  () => e.getDimension(r.Nether)
);
i.register(
  () => e.getDimension(r.Overworld)
);
export {
  n as OVERWORLD_V
};
