import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Change "your-repo-name" to your GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: "/Mask/"
});
