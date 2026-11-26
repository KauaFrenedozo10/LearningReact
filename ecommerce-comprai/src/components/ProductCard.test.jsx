import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ProductCard from "./ProductCard";

const product = { id: 1, nome: "Mouse Vento", categoria: "Informática", preco: 89.9, estoque: 5 };
const renderCard = (item, onAdd = vi.fn()) =>
  render(
    <MemoryRouter>
      <ProductCard product={item} onAddToCart={onAdd} />
    </MemoryRouter>
  );

describe("ProductCard", () => {
  it("mostra nome, categoria, imagem com texto alternativo e estoque", () => {
    renderCard(product);
    expect(screen.getByRole("link", { name: "Mouse Vento" })).toHaveAttribute(
      "href",
      "/produtos/1"
    );
    expect(screen.getByAltText(/Mouse Vento/)).toBeInTheDocument();
    expect(screen.getByText("Em estoque: 5")).toBeInTheDocument();
  });

  it("chama onAddToCart com o produto ao clicar no botão", async () => {
    const onAdd = vi.fn();
    renderCard(product, onAdd);
    await userEvent.click(screen.getByRole("button", { name: /Adicionar Mouse Vento/ }));
    expect(onAdd).toHaveBeenCalledWith(product);
  });

  it("desabilita o botão quando o produto está esgotado", () => {
    renderCard({ ...product, estoque: 0 });
    expect(screen.getByRole("button", { name: /Adicionar Mouse Vento/ })).toBeDisabled();
    expect(screen.getByText("Esgotado")).toBeInTheDocument();
  });
});
