import ListaDeTarefas from "./components/ListaDeTarefas";

function App() {

  const tarefas = [
    
  ];

  return (
    <div>
      <h1>Minhas tarefas</h1>

      <ListaDeTarefas tarefas={tarefas} />
    </div>
  );
}

export default App;