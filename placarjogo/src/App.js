import { useState } from 'react';
import Placar from './components/Placar';
import AcoesJogo from './components/AcoesJogo';
import Historico from './components/Historico';
import ControlesGerais from './components/ControlesGerais';

export default function App() {
  const [pontosA, setPontosA] = useState(0);
  const [pontosB, setPontosB] = useState(0);
  const [posseTimeA, setPosseTimeA] = useState(true); 
  const [historico, setHistorico] = useState([]);
  function registrarPontos(pontos) {
    const timeAtual = posseTimeA ? 'Time A' : 'Time B';
    if (posseTimeA) {
      setPontosA(pontosA + pontos);
    } else {
      setPontosB(pontosB + pontos);
    }
    setHistorico([
      ...historico,
      `${timeAtual} marcou +${pontos} ponto(s)`
    ]);
    setPosseTimeA(!posseTimeA);
  }
  function passarBola() {
    setPosseTimeA(!posseTimeA);
  }
  function zeraPlacar() {
    setPontosA(0)
    setPontosB(0)
    setPosseTimeA(true)
    setHistorico([])

  }
  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Placar do Jogo</h1>
      <Placar
        pontosA={pontosA}
        pontosB={pontosB}
        posseTimeA={posseTimeA}
      />
      <AcoesJogo
        onPontuar={registrarPontos}
        onPassarBola={passarBola}
      />
      <Historico historico={historico} />

      <ControlesGerais onZerarPlacar={zeraPlacar}/>
    </div>
  );
}