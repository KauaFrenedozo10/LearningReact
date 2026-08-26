import React from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className={`square ${value ? `square-${value.toLowerCase()}` : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;