
import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <section
      className={`ttt-square ${value ? "filled" : ""}`}
      onClick={onClick}
    >
      {value === "O" && (
        <svg className="circle-svg" viewBox="0 0 36 36">
          <defs>
            <filter
              id="inner-shadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feOffset dx="0.7" dy="0.7" />
              <feGaussianBlur stdDeviation="1" result="offset-blur" />
              <feComposite
                operator="out"
                in="SourceGraphic"
                in2="offset-blur"
                result="inverse"
              />
              <feFlood floodColor="black" floodOpacity="0.6" result="color" />
              <feComposite
                operator="in"
                in="color"
                in2="inverse"
                result="shadow"
              />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>
          <path
            className="circle"
            d="M18 4.5
              a 12.7324 12.7324 0 0 1 0 25.4648
              a 12.7324 12.7324 0 0 1 0 -25.4648"
            filter="url(#inner-shadow)"
          />
        </svg>
      )}
      {value === "X" && (
        <svg className="x-svg" viewBox="0 0 36 36">
          <defs>
            <filter
              id="inner-shadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feOffset dx="0.7" dy="0.7" />
              <feGaussianBlur stdDeviation="1" result="offset-blur" />
              <feComposite
                operator="out"
                in="SourceGraphic"
                in2="offset-blur"
                result="inverse"
              />
              <feFlood floodColor="black" floodOpacity="0.6" result="color" />
              <feComposite
                operator="in"
                in="color"
                in2="inverse"
                result="shadow"
              />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>
          <line
            x1="7.2"
            y1="7.2"
            x2="28.8"
            y2="28.8"
            className="x-line1"
            filter="url(#inner-shadow)"
            strokeLinecap="round"
          />
          <line
            x1="28.8"
            y1="7.2"
            x2="7.2"
            y2="28.8"
            className="x-line2"
            filter="url(#inner-shadow)"
            strokeLinecap="round"
          />
        </svg>
      )}
    </section>
  );
}

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
