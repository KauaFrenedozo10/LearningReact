import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setupTests.js",
    exclude: ["e2e/**", "node_modules/**"],
    // Sem atraso artificial na API simulada, para os testes rodarem rápido.
    env: { VITE_MOCK_DELAY_MS: "0" },
  },
});
