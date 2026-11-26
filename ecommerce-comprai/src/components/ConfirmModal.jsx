import { useEffect, useRef } from "react";

/**
 * Janela de confirmação acessível: foco vai para o botão Cancelar ao abrir,
 * Tab fica preso dentro da janela, Esc cancela e o foco volta ao elemento anterior ao fechar.
 * @param {{ title: string, message: string, confirmLabel?: string, onConfirm: Function, onCancel: Function }} props
 */
export default function ConfirmModal({
  title,
  message,
  confirmLabel = "Confirmar",
  onConfirm,
  onCancel,
}) {
  const cancelButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    cancelButtonRef.current.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      onCancel();
      return;
    }
    if (event.key !== "Tab") return;

    const buttons = dialogRef.current.querySelectorAll("button");
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <div
        className="modal d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <div className="modal-dialog modal-dialog-centered" ref={dialogRef}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id="confirm-modal-title">
                {title}
              </h2>
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                ref={cancelButtonRef}
                onClick={onCancel}
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={onConfirm}>
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}
