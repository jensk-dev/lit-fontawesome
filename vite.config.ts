import { defineConfig } from "vitest/config";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import packageProcess from "@jensk/rollup-plugin-package-process";

export default defineConfig({
  publicDir: "static",
  build: {
    lib: {
      entry: resolve(__dirname, "src"),
      formats: ["es"],
    },
    terserOptions: {
      ecma: 2020,
      module: true,
    },
    minify: "terser",
    rollupOptions: {
      preserveEntrySignatures: "strict",
      output: {
        preserveModules: true,
        entryFileNames: "[name].js",
        format: "es",
      },
      external: ["lit", "lit/decorators.js"],
      plugins: [
        packageProcess({
          output: {
            replaceExisting: true,
          },
          process: inputPackage => {
            inputPackage.type = "module";
            inputPackage.module = inputPackage.main;
            inputPackage.peerDependencies = inputPackage.dependencies;

            delete inputPackage.devDependencies;
            delete inputPackage.dependencies;
            delete inputPackage.scripts;

            return inputPackage;
          },
        }),
      ],
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    include: ["test/**/*.spec.ts"],
  },
  plugins: [dts({ exclude: ["**/vite-env.d.ts"] }) as Plugin],
});
