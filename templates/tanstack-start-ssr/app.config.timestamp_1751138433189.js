// app.config.ts
import tailwindcss from "@tailwindcss/vite";
import { createApp } from "vinxi";
import { resolve } from "path";
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
      target: "browser"
    },
    {
      name: "server-fns",
      type: "http",
      base: "/api",
      handler: "./app/api.ts",
      target: "server"
    }
  ],
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths(),
      svgr(),
      checker({ typescript: true })
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./app")
      }
    }
  }
});
export {
  app_config_default as default
};
