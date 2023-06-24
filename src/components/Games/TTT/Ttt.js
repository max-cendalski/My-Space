import Square from "./Square";
import { useState } from "react";



export default function TttComponent() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleClick(index) {
    if (squares[index] !== null) {
      return;
    }

    const newSquares = squares.slice(); // Copy the array
    newSquares[index] = isXNext ? "X" : "O"; // Fill the clicked square with 'X' or 'O'

    // Update the squares state
    setSquares(newSquares);

    // Switch the player
    setIsXNext(!isXNext);
  }

  return (
    <article className="ttt-container">
      <h1>Hello CodeSandbox</h1>
      <button onClick={() => setSquares(Array(9).fill(null))}>RESET</button>
      <article className="ttt-game-area-container">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </article>
    </article>
  );
}
