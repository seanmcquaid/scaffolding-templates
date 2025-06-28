// app.config.ts
import tailwindcss from "@tailwindcss/vite";
import { createApp } from "vinxi";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";
var app_config_default = createApp({
  routers: [
    {
      name: "public",
      type: "static",
      dir: "./public"
    },
    {
      name: "ssr",
      type: "http",
      handler: "./app/ssr.tsx",
      target: "server"
    },
    {
      name: "client",
      type: "spa",
      handler: "./app/client.tsx",
      target: "browser",
      plugins: [
        tailwindcss(),
        tsConfigPaths(),
        svgr(),
        checker({ typescript: true })
      ]
    },
    {
      name: "server-fns",
      type: "http",
      base: "/api",
      handler: "./app/api.ts",
      target: "server"
    }
  ]
});
export {
  app_config_default as default
};
