import { describe, expect, it } from "vitest";
import { filterProducts, getCategories } from "./productFilters";

const products = [
  { id: 1, nome: "Notebook", categoria: "Informática", preco: 3000 },
  { id: 2, nome: "Mouse", categoria: "Informática", preco: 90 },
  { id: 3, nome: "Cafeteira", categoria: "Casa", preco: 160 },
];
const noFilters = { search: "", category: "", minPrice: "", maxPrice: "" };

describe("filterProducts", () => {
  it("sem filtros devolve todos", () => {
    expect(filterProducts(products, noFilters)).toHaveLength(3);
  });

  it("busca por nome sem diferenciar maiúsculas", () => {
    expect(filterProducts(products, { ...noFilters, search: "MOU" })).toEqual([products[1]]);
  });

  it("filtra por categoria e faixa de preço", () => {
    const result = filterProducts(products, {
      ...noFilters,
      category: "Informática",
      maxPrice: "100",
    });
    expect(result).toEqual([products[1]]);
    expect(filterProducts(products, { ...noFilters, minPrice: "100", maxPrice: "200" })).toEqual([
      products[2],
    ]);
  });

  it("lista categorias sem repetição", () => {
    expect(getCategories(products)).toEqual(["Casa", "Informática"]);
  });
});
