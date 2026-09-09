import { useState } from "react";

function FormEvento() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipoParticipante, setTipoParticipante] = useState("estudante");
  const [turno, setTurno] = useState("manha");
  const [oficinas, setOficinas] = useState([]);
  const [aceiteRegulamento, setAceiteRegulamento] = useState(false);

  function handleOficina(e) {
    if (e.target.checked) {
      setOficinas([...oficinas, e.target.value]);
    } else {
      setOficinas(oficinas.filter((o) => o !== e.target.value));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(nome);
    console.log(email);
    console.log(tipoParticipante);
    console.log(turno);
    console.log(oficinas);
    console.log(aceiteRegulamento);

    setNome("");
    setEmail("");
    setTipoParticipante("estudante");
    setTurno("manha");
    setOficinas([]);
    setAceiteRegulamento(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscrição no Evento</h2>

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

      <p>Tipo de participante:</p>

      <label>
        <input
          type="radio"
          name="tipo"
          value="estudante"
          checked={tipoParticipante === "estudante"}
          onChange={(e) => setTipoParticipante(e.target.value)}
        />
        Estudante
      </label>

      <label>
        <input
          type="radio"
          name="tipo"
          value="profissional"
          checked={tipoParticipante === "profissional"}
          onChange={(e) => setTipoParticipante(e.target.value)}
        />
        Profissional
      </label>

      <p>Turno:</p>

      <select value={turno} onChange={(e) => setTurno(e.target.value)}>
        <option value="manha">Manhã</option>
        <option value="tarde">Tarde</option>
        <option value="noite">Noite</option>
      </select>

      <p>Oficinas:</p>

      <label>
        <input
          type="checkbox"
          value="frontend"
          checked={oficinas.includes("frontend")}
          onChange={handleOficina}
        />
        Front-end
      </label>

      <label>
        <input
          type="checkbox"
          value="backend"
          checked={oficinas.includes("backend")}
          onChange={handleOficina}
        />
        Back-end
      </label>

      <label>
        <input
          type="checkbox"
          value="dados"
          checked={oficinas.includes("dados")}
          onChange={handleOficina}
        />
        Dados
      </label>

      <label>
        <input
          type="checkbox"
          value="ia"
          checked={oficinas.includes("ia")}
          onChange={handleOficina}
        />
        Inteligência Artificial
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={aceiteRegulamento}
          onChange={(e) => setAceiteRegulamento(e.target.checked)}
        />
        Aceito o regulamento
      </label>

      <br />

      <input
        type="submit"
        value="Enviar"
        disabled={!aceiteRegulamento}
      />
    </form>
  );
}

export default FormEvento;
