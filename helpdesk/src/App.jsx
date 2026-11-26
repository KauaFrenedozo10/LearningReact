import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from './components/NavBar.jsx';
import FormChamado from './components/FormChamado.jsx';
import ListaChamados from './components/ListaChamados.jsx';
import useFetch from './hooks/useFetch.js';

const URL_API = 'http://localhost:3000/chamados';

export default function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('form');

  // GET (useEffect com [] dentro do hook useFetch)
  const { dados: chamados, setDados: setChamados, loading, erro } = useFetch(URL_API);

  function handleNovoChamado(novoChamado) {
    // atualiza a lista direto no state, sem novo GET
    setChamados((prev) => [...prev, novoChamado]);
    setPaginaAtiva('lista');
  }

  return (
    <>
      <NavBar paginaAtiva={paginaAtiva} onMudarPagina={setPaginaAtiva} />
      <Container className="py-4">
        {paginaAtiva === 'form' && (
          <FormChamado url={URL_API} onCadastrado={handleNovoChamado} />
        )}
        {paginaAtiva === 'lista' && (
          <ListaChamados chamados={chamados} loading={loading} erro={erro} />
        )}
      </Container>
    </>
  );
}
