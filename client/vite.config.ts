import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
    hmr: {
      overlay: false,
    },
  },

  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "#": path.resolve(__dirname, "./app"),
      "mapbox-gl": "mapbox-gl/dist/mapbox-gl.js",
    },
  },
});
