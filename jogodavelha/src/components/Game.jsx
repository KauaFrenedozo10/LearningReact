import React, { useState } from "react";
import Tabuleiro, { calculaVencedor } from "./Tabuleiro";
import Historico from "./Historico";

function Game() {
  const [history, setHistory] = useState([
    Array(9).fill(null)
  ]);

  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const winner = calculaVencedor(currentSquares);

  let status;

  if (winner) {
    status = `Vencedor: ${winner}`;
  } else if (currentSquares.every(Boolean)) {
    status = "Empate!";
  } else {
    status = `Próximo jogador: ${xIsNext ? "X" : "O"}`;
  }

  function reiniciarJogo() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <div className="game">

      <div className="game-container">

        <header className="game-header">
          <h1>Jogo da Velha</h1>
          <p>Desafie seu oponente!</p>
        </header>

        <div className="game-content">

          <div className="game-board">

            <div className="status">
              {winner && (
                <span className="winner-icon">
                  🏆
                </span>
              )}

              {status}
            </div>

            <Tabuleiro
              squares={currentSquares}
              onPlay={handlePlay}
            />

            <button
              className="restart-button"
              onClick={reiniciarJogo}
            >
              Reiniciar Jogo
            </button>

          </div>

          <Historico
            history={history}
            currentMove={currentMove}
            jumpTo={jumpTo}
          />

        </div>

      </div>

    </div>
  );
}

export default Game;