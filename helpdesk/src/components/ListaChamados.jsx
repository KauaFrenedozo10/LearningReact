const COR_PRIORIDADE = {
  Baixa: 'success',
  Média: 'warning',
  Alta: 'danger',
};

export default function ListaChamados({ chamados, loading, erro }) {
  if (loading) {
    return <p className="text-muted">Carregando chamados...</p>;
  }

  if (erro) {
    return <div className="alert alert-danger">{erro}</div>;
  }

  return (
    <div>
      <h2 className="mb-4">Chamados abertos</h2>

      {chamados.length === 0 ? (
        <p className="text-muted">Nenhum chamado aberto até agora.</p>
      ) : (
        <ul className="list-group">
          {chamados.map((c) => (
            <li key={c.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-1">{c.solicitante}</h5>
                  <p className="mb-1">{c.descricao}</p>
                  <small className="text-muted">
                    {c.setor} · {c.tipo}
                  </small>
                </div>
                <span className={`badge text-bg-${COR_PRIORIDADE[c.prioridade] || 'secondary'}`}>
                  {c.prioridade}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
