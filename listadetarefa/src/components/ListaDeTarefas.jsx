function ListaDeTarefas({ tarefas }) {

  return (
    <div>
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa para exibir.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa, index) => (
            <li key={index}>{tarefa}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaDeTarefas;
