import { useState } from "react";

function FormPesquisa() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [satisfacao, setSatisfacao] = useState("neutro");
  const [comentario, setComentario] = useState("");
  const [aceiteTermos, setAceiteTermos] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(nome);
    console.log(email);
    console.log(satisfacao);
    console.log(comentario);
    console.log(aceiteTermos);

    setNome("");
    setEmail("");
    setSatisfacao("neutro");
    setComentario("");
    setAceiteTermos(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pesquisa de Satisfação</h2>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p>Satisfação:</p>

      <label>
        <input
          type="radio"
          name="satisfacao"
          value="insatisfeito"
          checked={satisfacao === "insatisfeito"}
          onChange={(e) => setSatisfacao(e.target.value)}
        />
        Insatisfeito
      </label>

      <label>
        <input
          type="radio"
          name="satisfacao"
          value="neutro"
          checked={satisfacao === "neutro"}
          onChange={(e) => setSatisfacao(e.target.value)}
        />
        Neutro
      </label>

      <label>
        <input
          type="radio"
          name="satisfacao"
          value="satisfeito"
          checked={satisfacao === "satisfeito"}
          onChange={(e) => setSatisfacao(e.target.value)}
        />
        Satisfeito
      </label>

      <br />

      <textarea
        placeholder="Comentário"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />

      <br />

      <label>
        <input
          type="checkbox"
          checked={aceiteTermos}
          onChange={(e) => setAceiteTermos(e.target.checked)}
        />
        Aceito os termos
      </label>

      <br />

      <input type="submit" value="Enviar" disabled={!aceiteTermos} />
    </form>
  );
}

export default FormPesquisa;
