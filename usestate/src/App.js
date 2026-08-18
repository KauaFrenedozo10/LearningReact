import { useState } from "react";
import Botao from "./components/addCount";

function App() {
  const [total, setTotal] = useState(0);

  function Somatotal() {
    setTotal(total + 1);
  }

  return (
    <div style={{ padding: "20px" }}>
      <Botao titulo="Risco na superficie" onRegistrar={Somatotal} />
      <Botao titulo="Dimensão fora do padrão" onRegistrar={Somatotal} />
      <Botao titulo="Peça trincada" onRegistrar={Somatotal} />

      <p>
        {total === 0
          ? "Nenhum defeito registrado até o momento."
          : `Total: ${total}`}
      </p>
    </div>
  );
}

export default App;