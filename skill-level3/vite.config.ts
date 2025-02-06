import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env": process.env, //faire en sorte que process.env soir dispo
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Séparer les dépendances tierces (ex : React, Redux, etc.)
          if (id.includes("node_modules")) {
            // Crée un chunk pour chaque dépendance de node_modules
            return id.toString().split("node_modules/")[1].split("/")[0];
          }
        },
      },
    },
  },
});
