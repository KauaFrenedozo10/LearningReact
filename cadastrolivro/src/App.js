import { useState } from "react";
import FormLivro from "./components/FormLivro";
import TabelaAcervo from "./components/TabelaAcervo";
import NavBar from "./components/NavBar";

function App() {
  const [livros, setLivros] = useState([]);
  const [aba, setAba] = useState("cadastro");

  function adicionarLivro(livro) {
    setLivros([...livros, livro]);
  }

  return (
    <>
      <NavBar aba={aba} setAba={setAba} />

      <div className="container mt-4">

        {aba === "cadastro" && (
          <>
            <h1 className="mb-4">Cadastro de Livros</h1>

            <FormLivro adicionarLivro={adicionarLivro} />

            <h2 className="mt-5">Livros cadastrados</h2>

            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Autor</th>
                  </tr>
                </thead>

                <tbody>
                  {livros.map((livro, index) => (
                    <tr key={index}>
                      <td>{livro.titulo}</td>
                      <td>{livro.autor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {aba === "acervo" && (
          <>
            <h1 className="mb-4">Acervo</h1>

            <TabelaAcervo livros={livros} />
          </>
        )}

      </div>
    </>
  );
}

export default App;

