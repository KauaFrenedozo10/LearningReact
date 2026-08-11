import "./App.css";
import EquipamentoCard from "./components/equipamentoCard";
import { EquipamentosIndustrial } from "./data/ordens";

function App() {
  return (
    <div style={{padding: "30px" }}>
      <h1>Painel de Equipamentos Industriais</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
        {EquipamentosIndustrial.map((equipamento) => (
          <EquipamentoCard
            key={equipamento.id}
            equipamento={equipamento}
          />
        ))}
      </div>
    </div>
  );
}

export default App;