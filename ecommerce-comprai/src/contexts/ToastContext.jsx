import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { TOAST_DURATION_MS } from "../config";

const ToastContext = createContext(null);

/**
 * Mensagens de sucesso e de erro. A área é uma região "aria-live", então
 * leitores de tela anunciam cada mensagem nova.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, variant = "success") => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { id, message, variant }]);
      setTimeout(() => dismissToast(id), TOAST_DURATION_MS);
    },
    [dismissToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container position-fixed bottom-0 end-0 p-3" aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`alert alert-${toast.variant} shadow d-flex gap-3`}
            role="status"
          >
            <span className="flex-grow-1">{toast.message}</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Fechar mensagem"
              onClick={() => dismissToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast precisa estar dentro de <ToastProvider>.");
  return context;
}
