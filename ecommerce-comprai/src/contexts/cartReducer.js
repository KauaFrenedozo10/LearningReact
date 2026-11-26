// Lógica pura do carrinho (sem React), fácil de testar.
// Cada item: { produtoId, nome, preco, estoque, quantidade }.

export const CART_ACTIONS = {
  ADD: "add",
  REMOVE: "remove",
  SET_QUANTITY: "setQuantity",
  CLEAR: "clear",
};

const MIN_QUANTITY = 1;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * @param {Object[]} items - itens atuais.
 * @param {{ type: string, product?: Object, productId?: number, quantity?: number }} action
 * @returns {Object[]} novo array de itens (o original nunca é alterado).
 */
export function cartReducer(items, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const { product } = action;
      if (product.estoque < MIN_QUANTITY) return items;

      const existing = items.find((item) => item.produtoId === product.id);
      if (!existing) {
        return [
          ...items,
          {
            produtoId: product.id,
            nome: product.nome,
            preco: product.preco,
            estoque: product.estoque,
            quantidade: MIN_QUANTITY,
          },
        ];
      }
      return items.map((item) =>
        item.produtoId === product.id
          ? { ...item, quantidade: Math.min(item.quantidade + 1, item.estoque) }
          : item
      );
    }
    case CART_ACTIONS.REMOVE:
      return items.filter((item) => item.produtoId !== action.productId);
    case CART_ACTIONS.SET_QUANTITY: {
      if (!Number.isFinite(action.quantity)) return items;
      return items.map((item) =>
        item.produtoId === action.productId
          ? { ...item, quantidade: clamp(action.quantity, MIN_QUANTITY, item.estoque) }
          : item
      );
    }
    case CART_ACTIONS.CLEAR:
      return [];
    default:
      return items;
  }
}

/** @returns {number} soma de preço x quantidade de todos os itens. */
export function calculateCartTotal(items) {
  return items.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

/** @returns {number} total de unidades no carrinho. */
export function countCartItems(items) {
  return items.reduce((total, item) => total + item.quantidade, 0);
}
