import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { STORAGE_KEYS } from "../config";
import { CART_ACTIONS, calculateCartTotal, cartReducer, countCartItems } from "./cartReducer";

const CartContext = createContext(null);

/** Lê o carrinho salvo; se o conteúdo estiver corrompido, começa vazio. */
function loadSavedCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.cart);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn("Carrinho salvo inválido; começando vazio.", error);
    return [];
  }
}

/** Estado compartilhado do carrinho; é salvo no localStorage para sobreviver a F5. */
export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadSavedCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items));
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      total: calculateCartTotal(items),
      itemCount: countCartItems(items),
      addItem: (product) => dispatch({ type: CART_ACTIONS.ADD, product }),
      removeItem: (productId) => dispatch({ type: CART_ACTIONS.REMOVE, productId }),
      setQuantity: (productId, quantity) =>
        dispatch({ type: CART_ACTIONS.SET_QUANTITY, productId, quantity }),
      clearCart: () => dispatch({ type: CART_ACTIONS.CLEAR }),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa estar dentro de <CartProvider>.");
  return context;
}
