import { useState, useEffect } from "react";

function TituloDinamico() {
  const [texto, setTexto] = useState("");

  useEffect(() => {
    document.title = texto;
  }, [texto]);

  return (
    <div>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <p>{texto}</p>
    </div>
  );
}

export default TituloDinamico;
