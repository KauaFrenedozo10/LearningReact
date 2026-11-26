import { describe, expect, it } from "vitest";
import { CART_ACTIONS, calculateCartTotal, cartReducer, countCartItems } from "./cartReducer";

const mouse = { id: 2, nome: "Mouse", preco: 90, estoque: 3 };

describe("cartReducer", () => {
  it("adiciona um item novo com quantidade 1", () => {
    const result = cartReducer([], { type: CART_ACTIONS.ADD, product: mouse });
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ produtoId: 2, quantidade: 1 });
  });

  it("soma a quantidade ao adicionar o mesmo produto, sem passar do estoque", () => {
    let items = [];
    for (let i = 0; i < 5; i += 1)
      items = cartReducer(items, { type: CART_ACTIONS.ADD, product: mouse });
    expect(items[0].quantidade).toBe(mouse.estoque);
  });

  it("não adiciona produto esgotado", () => {
    expect(cartReducer([], { type: CART_ACTIONS.ADD, product: { ...mouse, estoque: 0 } })).toEqual(
      []
    );
  });

  it("altera a quantidade respeitando mínimo e estoque", () => {
    const items = cartReducer([], { type: CART_ACTIONS.ADD, product: mouse });
    const tooMany = cartReducer(items, {
      type: CART_ACTIONS.SET_QUANTITY,
      productId: 2,
      quantity: 99,
    });
    const tooFew = cartReducer(items, {
      type: CART_ACTIONS.SET_QUANTITY,
      productId: 2,
      quantity: 0,
    });
    expect(tooMany[0].quantidade).toBe(3);
    expect(tooFew[0].quantidade).toBe(1);
  });

  it("remove e limpa sem alterar o array original", () => {
    const items = cartReducer([], { type: CART_ACTIONS.ADD, product: mouse });
    expect(cartReducer(items, { type: CART_ACTIONS.REMOVE, productId: 2 })).toEqual([]);
    expect(cartReducer(items, { type: CART_ACTIONS.CLEAR })).toEqual([]);
    expect(items).toHaveLength(1);
  });

  it("calcula total e quantidade de itens", () => {
    const items = [
      { produtoId: 1, preco: 10, quantidade: 2 },
      { produtoId: 2, preco: 5, quantidade: 3 },
    ];
    expect(calculateCartTotal(items)).toBe(35);
    expect(countCartItems(items)).toBe(5);
  });
});
