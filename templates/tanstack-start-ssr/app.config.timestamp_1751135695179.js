// app.config.ts
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/react-start/config";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";
var app_config_default = defineConfig({
  tsr: {
    routeFileIgnorePattern: ".*\\.test\\.tsx"
  },
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths(),
      svgr(),
      checker({ typescript: true })
    ]
  }
});
export {
  app_config_default as default
};
