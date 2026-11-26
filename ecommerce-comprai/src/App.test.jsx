import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import { renderWithProviders } from "./test/renderWithProviders";

describe("App", () => {
  it("mostra a página 404 com o caminho digitado", () => {
    renderWithProviders(<App />, "/rota-que-nao-existe");
    expect(screen.getByRole("heading", { name: /404/ })).toBeInTheDocument();
    expect(screen.getByText("/rota-que-nao-existe")).toBeInTheDocument();
  });

  it("filtra o catálogo pela busca por nome", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText("Notebook Aurora 14")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("Buscar por nome"), "livro");
    expect(screen.queryByText("Notebook Aurora 14")).not.toBeInTheDocument();
    expect(screen.getByText("Livro Aprendendo React")).toBeInTheDocument();
  });

  it("fluxo completo: catálogo -> carrinho -> checkout -> pagamento aprovado -> pedido", async () => {
    renderWithProviders(<App />);

    await userEvent.click(
      await screen.findByRole("button", { name: /Adicionar Mouse sem fio Vento/ })
    );
    await userEvent.click(screen.getByRole("link", { name: /Carrinho/ }));
    expect(await screen.findByRole("heading", { name: "Carrinho" })).toBeInTheDocument();
    expect(screen.getAllByText(/89,90/).length).toBeGreaterThan(0);

    await userEvent.click(screen.getByRole("link", { name: "Finalizar compra" }));
    await userEvent.selectOptions(await screen.findByLabelText("Cliente"), "Maria Souza");
    await userEvent.click(screen.getByRole("button", { name: "Pagar" }));
    expect(await screen.findByText(/Pagamento aprovado/)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("link", { name: "Ver pedido" }));
    expect(await screen.findByRole("heading", { name: /Pedido nº 1/ })).toBeInTheDocument();
    expect(screen.getByText("Mouse sem fio Vento")).toBeInTheDocument();
  });

  it("não deixa pagar com cartão sem o número", async () => {
    renderWithProviders(<App />);
    await userEvent.click(
      await screen.findByRole("button", { name: /Adicionar Mouse sem fio Vento/ })
    );
    await userEvent.click(screen.getByRole("link", { name: /Carrinho/ }));
    await userEvent.click(await screen.findByRole("link", { name: "Finalizar compra" }));

    await userEvent.selectOptions(await screen.findByLabelText("Cliente"), "Maria Souza");
    await userEvent.click(screen.getByLabelText("Cartão de crédito"));
    await userEvent.click(screen.getByRole("button", { name: "Pagar" }));
    expect(screen.getByText(/Informe os 16 dígitos do cartão/)).toBeInTheDocument();
  });
});
