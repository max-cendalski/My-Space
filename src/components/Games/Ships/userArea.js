import { useState, useEffect, useRef } from "react";

const ShipsUserArea = () => {
  const [squares, setSquares] = useState([]);
  const [alphabet, setAlphabet] = useState([]);
  const yAxisMobile = useRef([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);

  const ship5 = useRef([]);
  const ship4 = useRef([]);
  const ship3 = useRef([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      /* "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z", */
    ];
    var arr = [];
    for (let i = 0; i <= 20; i++) {
      for (let j = 0; j < 15; j++) {
        arr.push({
          char: alphabet[j],
          num: i,
          squareHit: false,
          squareShip: false,
        });
      }
    }
    setSquares(arr);
    setAlphabet(alphabet);
    console.log("whe");
  }, []);

  return (
    <>
      <article>
        <h1> User Area</h1>
        <article>
          {squares.map((item, index) => (
            <div
              key={index}
              className={`square  ${item.shipHit ? "ship-hit" : ""}
                ${item.squareHit ? "square-hit" : ""}`}
            ></div>
          ))}
        </article>
      </article>
    </>
  );
};

export default ShipsUserArea;
