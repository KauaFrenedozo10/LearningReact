import { useState } from "react";

function FormLivro({ adicionarLivro }) {

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ano, setAno] = useState("");

  const [erros, setErros] = useState({});

  function validar() {

    const novosErros = {};

    if (titulo.trim().length < 3) {
      novosErros.titulo = "O título deve ter no mínimo 3 caracteres.";
    }

    if (autor.trim().length < 3) {
      novosErros.autor = "O autor deve ter no mínimo 3 caracteres.";
    }

    if (categoria === "") {
      novosErros.categoria = "Selecione uma categoria.";
    }

    const anoAtual = new Date().getFullYear();

    if (ano === "") {
      novosErros.ano = "Informe o ano de publicação.";
    } else if (Number(ano) <= 1900) {
      novosErros.ano = "O ano deve ser maior que 1900.";
    } else if (Number(ano) > anoAtual) {
      novosErros.ano = "O ano não pode ser futuro.";
    }

    return novosErros;
  }

  function enviar(e) {
    e.preventDefault();

    const novosErros = validar();

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {

      const novoLivro = {
        titulo: titulo,
        autor: autor,
        categoria: categoria,
        ano: ano
      };

      adicionarLivro(novoLivro);

      setTitulo("");
      setAutor("");
      setCategoria("");
      setAno("");
      setErros({});
    }
  }

  return (
    <form onSubmit={enviar}>

      <div className="row">

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Título
          </label>

          <input
            type="text"
            className={`form-control ${erros.titulo ? "is-invalid" : ""}`}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          {erros.titulo && (
            <div className="invalid-feedback">
              {erros.titulo}
            </div>
          )}
        </div>


        <div className="col-md-6 mb-3">
          <label className="form-label">
            Autor
          </label>

          <input
            type="text"
            className={`form-control ${erros.autor ? "is-invalid" : ""}`}
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />

          {erros.autor && (
            <div className="invalid-feedback">
              {erros.autor}
            </div>
          )}
        </div>


        <div className="col-md-6 mb-3">
          <label className="form-label">
            Categoria
          </label>

          <select
            className={`form-select ${erros.categoria ? "is-invalid" : ""}`}
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">
              Selecione uma categoria
            </option>

            <option value="Romance">Romance</option>
            <option value="Técnico">Técnico</option>
            <option value="Infantil">Infantil</option>
            <option value="Biografia">Biografia</option>
          </select>

          {erros.categoria && (
            <div className="invalid-feedback">
              {erros.categoria}
            </div>
          )}
        </div>


        <div className="col-md-6 mb-3">
          <label className="form-label">
            Ano de publicação
          </label>

          <input
            type="number"
            className={`form-control ${erros.ano ? "is-invalid" : ""}`}
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          />

          {erros.ano && (
            <div className="invalid-feedback">
              {erros.ano}
            </div>
          )}
        </div>

      </div>

      <button type="submit" className="btn btn-primary">
        Cadastrar livro
      </button>

    </form>
  );
}

export default FormLivro;
