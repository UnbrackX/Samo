// vite.config.mjs
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("Loaded env:", env);

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
      strictPort: true,
      proxy: {
        "/api": env.VITE_API_URL,
        // '/api': {
        //   target: env.VITE_API_URL,
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/api/, ''),
        // },
      },
    },
  };
});
