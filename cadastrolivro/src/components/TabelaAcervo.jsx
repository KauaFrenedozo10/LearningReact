function TabelaAcervo({ livros }) {
  return (
    <div className="table-responsive">

      <table className="table table-striped align-middle">

        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Categoria</th>
            <th>Ano</th>
          </tr>
        </thead>

        <tbody>

          {livros.map((livro, index) => (
            <tr key={index}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.categoria}</td>
              <td>{livro.ano}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default TabelaAcervo;

