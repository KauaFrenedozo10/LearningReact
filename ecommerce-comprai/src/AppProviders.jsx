import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./contexts/ToastContext";

/** Junta os contextos globais (mensagens e carrinho) em um só lugar. */
export default function AppProviders({ children }) {
  return (
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  );
}
