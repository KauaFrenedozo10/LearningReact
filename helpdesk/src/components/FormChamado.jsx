import { useState } from 'react';

const SETORES = ['TI', 'RH', 'Financeiro', 'Operações', 'Comercial'];
const TIPOS = ['Hardware', 'Software', 'Rede', 'Acesso'];
const PRIORIDADES = ['Baixa', 'Média', 'Alta'];

export default function FormChamado({ url, onCadastrado }) {
  const [solicitante, setSolicitante] = useState('');
  const [setor, setSetor] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erros, setErros] = useState({});
  const [erroEnvio, setErroEnvio] = useState('');

  function validar() {
    const novosErros = {};
    if (solicitante.trim().length < 3) {
      novosErros.solicitante = 'Informe um nome com pelo menos 3 caracteres.';
    }
    if (!setor) novosErros.setor = 'Escolha um setor.';
    if (!tipo) novosErros.tipo = 'Escolha o tipo de problema.';
    if (descricao.trim().length < 10) {
      novosErros.descricao = 'Descreva o problema com pelo menos 10 caracteres.';
    }
    if (!prioridade) novosErros.prioridade = 'Escolha a prioridade.';
    return novosErros;
  }

  function limparCampos() {
    setSolicitante('');
    setSetor('');
    setTipo('');
    setDescricao('');
    setPrioridade('');
    setErros({});
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErroEnvio('');

    const novosErros = validar();
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    const chamado = {
      solicitante: solicitante.trim(),
      setor,
      tipo,
      descricao: descricao.trim(),
      prioridade,
    };

    setEnviando(true);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chamado),
    })
      .then((res) => res.json()) // chamado já com o id gerado
      .then((chamadoCriado) => {
        limparCampos();
        setEnviando(false);
        onCadastrado(chamadoCriado);
      })
      .catch(() => {
        setErroEnvio('Não foi possível enviar o chamado. Tente novamente.');
        setEnviando(false);
      });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="col-lg-8 mx-auto">
      <h2 className="mb-4">Abrir chamado</h2>

      <div className="mb-3">
        <label htmlFor="solicitante" className="form-label">Nome do solicitante</label>
        <input
          id="solicitante"
          type="text"
          className={`form-control ${erros.solicitante ? 'is-invalid' : ''}`}
          value={solicitante}
          onChange={(e) => setSolicitante(e.target.value)}
        />
        <div className="invalid-feedback">{erros.solicitante}</div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="setor" className="form-label">Setor</label>
          <select
            id="setor"
            className={`form-select ${erros.setor ? 'is-invalid' : ''}`}
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
          >
            <option value="">Selecione...</option>
            {SETORES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="invalid-feedback">{erros.setor}</div>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="tipo" className="form-label">Tipo de problema</label>
          <select
            id="tipo"
            className={`form-select ${erros.tipo ? 'is-invalid' : ''}`}
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Selecione...</option>
            {TIPOS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <div className="invalid-feedback">{erros.tipo}</div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="descricao" className="form-label">Descrição do problema</label>
        <textarea
          id="descricao"
          rows="4"
          className={`form-control ${erros.descricao ? 'is-invalid' : ''}`}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <div className="invalid-feedback">{erros.descricao}</div>
      </div>

      <div className="mb-4">
        <label htmlFor="prioridade" className="form-label">Prioridade</label>
        <select
          id="prioridade"
          className={`form-select ${erros.prioridade ? 'is-invalid' : ''}`}
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="">Selecione...</option>
          {PRIORIDADES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <div className="invalid-feedback">{erros.prioridade}</div>
      </div>

      {erroEnvio && <div className="alert alert-danger">{erroEnvio}</div>}

      <button type="submit" className="btn btn-primary" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Abrir chamado'}
      </button>
    </form>
  );
}
