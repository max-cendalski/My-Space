import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import GoBack from "../GoBack/GoBack";

const ShipsGame = () => {
  const [squares, setSquares] = useState([]);
  const [alphabet, setAlphabet] = useState([]);
  const [yAxisMobile, setYMobile] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13]);

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
      "o"
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
    let arr = [];
    for (var i = 0; i <= 25; i++) {
      for (var j = 0; j < 15; j++) {
        arr.push({ char: alphabet[j], num: i });
      }
    }
    setSquares(arr);
    setAlphabet(alphabet);
  }, []);

  const handleSquareClick = (item) => {
    let sq = { num: item.num, char: item.char };
    let index = squares.findIndex(
      (item) => item.num === sq.num && item.char === sq.char
    );
    console.log("index:", squares[index]);
  };

  return (
    <>
      <Navbar />
      <GoBack />
      <h1 className="ships-header">Game area</h1>
      <article id="ships-game-area-container">
        <article id="ships-computer-area">
          <section className="alphabet-container">
            {alphabet.map((item) => (
              <div className="alphabet-ships-square" key={item}>{item}</div>
            ))}
          </section>
          <section id="numbers-container">
            {yAxisMobile.map((item, index) => (
              <div className="numbers-square" key={index}>
                {item}
              </div>
            ))}
          </section>
          <article id="game-area">
            {squares.map((item, index) => (
              <div
              key={index}
                onClick={() => handleSquareClick(item)}
                className="square"
              ></div>
            ))}
          </article>
        </article>
        <article id="ships-user-area">

        </article>
      </article>
    </>
  );
};

export default ShipsGame;
