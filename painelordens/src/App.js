import OrdemCard from "./components/ordemCard";

import { OrdenDeProducao } from "./data/ordens";

function App () {
  return (
    <div style={{padding: "32px"}}>
      <h1>Painel de Ordens de produção</h1>
      {OrdenDeProducao.map(ordem => (
        <OrdemCard key={ordem.id} ordem={ordem}/>
      ))}
    </div>
  )
}

export default App;