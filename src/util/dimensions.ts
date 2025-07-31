import { world } from "@minecraft/server";
import { MinecraftDimensionTypes } from "@minecraft/vanilla-data";
import { deferredRegister } from "../deferred_register/deferred_register";

export const OVERWORLD_V = deferredRegister.register(() =>
  world.getDimension(MinecraftDimensionTypes.Overworld)
);

export const NETHER_V = deferredRegister.register(() =>
  world.getDimension(MinecraftDimensionTypes.Nether)
);

export const THE_END_V = deferredRegister.register(() =>
  world.getDimension(MinecraftDimensionTypes.Overworld)
);
