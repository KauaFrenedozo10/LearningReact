import React from "react";

function Historico({ history, currentMove, jumpTo }) {
  return (
    <div className="history">
      <h2>Histórico</h2>

      <div className="history-list">
        {history.map((_, move) => {
          const description =
            move === 0
              ? "Início do jogo"
              : `Ir para jogada ${move}`;

          return (
            <button
              key={move}
              className={`history-button ${
                move === currentMove ? "active" : ""
              }`}
              onClick={() => jumpTo(move)}
            >
              {description}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Historico;