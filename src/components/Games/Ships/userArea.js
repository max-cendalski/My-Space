import { useState, useEffect, useRef } from "react";

const ShipsUserArea = () => {
  const [squaresU, setSquaresU] = useState([]);
  const [alphabetU, setAlphabetU] = useState([]);

  const yAxisMobileU = useRef([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);

/*   const shipsU = useRef({
    ship6U: [],
    ship5U: [],
    ship4U: [],
    ship3U: [],
  }); */

  const handleSquareClick = (item) => {

    setSquaresU((currentSquares) => {
      let updatedSquares = [...currentSquares];
      let index = squaresU.findIndex(
        (square) => square.num === item.num && square.char === item.char
      );
      updatedSquares[index].shipHit = true;
      console.log("item2", item);
      return updatedSquares;
    });
  };

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
          shipHit: false,
        });
      }
    }
    setSquaresU(arr);
    setAlphabetU(alphabet);
    console.log("useruseEffect");
  }, []);

  return (
    <>
      <section>
        <h2>Player Area</h2>
      </section>
      <article id="ships-battle-area">
        <section className="alphabet-container">
          {alphabetU.map((item) => (
            <div className="alphabet-ships-square" key={item}>
              {item}
            </div>
          ))}
        </section>
        <section id="numbers-container">
          {yAxisMobileU.current.map((item, index) => (
            <div className="numbers-square" key={index}>
              {item}
            </div>
          ))}
        </section>
        <article id="battle-area">
          {squaresU.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSquareClick(item)}
              className={`square  ${item.shipHit ? "ship-hit" : ""}
                ${item.squareHit ? "square-hit" : ""}`}
            ></div>
          ))}
        </article>
        <section className="hidden">
          <p></p>
        </section>
      </article>
    </>
  );
};

export default ShipsUserArea;
