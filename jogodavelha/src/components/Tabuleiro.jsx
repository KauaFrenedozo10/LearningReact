import React from "react";
import Square from "./Square";

function Tabuleiro({ squares, onPlay }) {
  function handleClick(i) {
    // Não permite jogar em uma casa ocupada
    if (squares[i] || calculaVencedor(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    // Descobre quem deve jogar
    const xIsNext = squares.filter(Boolean).length % 2 === 0;

    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onSquareClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}

export function calculaVencedor(squares) {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < linhas.length; i++) {
    const [a, b, c] = linhas[i];

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

export default Tabuleiro;