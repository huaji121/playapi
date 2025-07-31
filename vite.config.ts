import { defineConfig } from "vite";
import { resolve } from "path";
import { builtinModules } from "module";
import { viteStaticCopy } from "vite-plugin-static-copy";

const game_root = resolve(
  process.env.LOCALAPPDATA!,
  "Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang"
);
const bp_target = resolve(game_root, "development_behavior_packs");
const rp_target = resolve(game_root, "development_resource_packs");

export default ({ mode }) =>
  defineConfig({
    plugins:
      mode === "development"
        ? [
            viteStaticCopy({
              targets: [
                {
                  src: "playapi_bp/*",
                  dest: resolve(bp_target, "playapi_bp"),
                },
                {
                  src: "playapi_rp/*",
                  dest: resolve(rp_target, "playapi_rp"),
                },
              ],
            }),
          ]
        : [],
    build: {
      lib: {
        entry: resolve(__dirname, "src/main.ts"),
        formats: ["es"],
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          entryFileNames: "[name].js",
        },
        external: [
          "@minecraft/server",
          "@minecraft/server-ui",
          "commander",
          ...builtinModules,
        ],
      },
      outDir: "playapi_bp/scripts",
    },
  });
