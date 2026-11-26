/**
 * Mensagem de erro com botão opcional de tentar de novo.
 * @param {{ error: Error, onRetry?: Function }} props
 */
export default function ErrorMessage({ error, onRetry }) {
  return (
    <div className="alert alert-danger d-flex align-items-center gap-3" role="alert">
      <span className="flex-grow-1">{error?.message ?? "Ocorreu um erro inesperado."}</span>
      {onRetry && (
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}
