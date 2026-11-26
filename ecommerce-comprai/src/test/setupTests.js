import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cada teste começa limpo: sem componentes na tela e sem dados salvos (carrinho e API simulada).
afterEach(() => {
  cleanup();
  localStorage.clear();
});
