import { useState, useEffect } from "react";

function ContadorCurtidas() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    if (contador >= 5) {
      alert("Curtidas em alta!");
    }
  }, [contador]);

  return (
    <div>
      <h1>Curtidas: {contador}</h1>

      <button onClick={() => setContador(contador + 1)}>
        Curtir 
      </button>
    </div>
  );
}

export default ContadorCurtidas;