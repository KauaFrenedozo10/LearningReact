import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppProviders from "../AppProviders";

/**
 * Renderiza um elemento com Router em memória e os contextos da aplicação.
 * @param {JSX.Element} ui - o que será renderizado.
 * @param {string} [route] - rota inicial.
 */
export function renderWithProviders(ui, route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AppProviders>{ui}</AppProviders>
    </MemoryRouter>
  );
}
