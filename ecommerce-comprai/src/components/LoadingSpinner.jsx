/** Indicador de carregamento; o texto escondido é lido por leitores de tela. */
export default function LoadingSpinner({ label = "Carregando..." }) {
  return (
    <div className="d-flex justify-content-center py-5" role="status">
      <div className="spinner-border text-primary" aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
