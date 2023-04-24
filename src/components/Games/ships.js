import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import GoBack from "../GoBack/GoBack";

const ShipsGame = () => {
  const [squares, setSquares] = useState([]);
  const [alphabet, setAlphabet] = useState([]);
  const [yAxisMobile, setYMobile] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  const [ship5, setShip5] = useState([]);
  const [ship4, setShip4] = useState([]);
  const [ship3, setShip3] = useState([]);

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
    let arr = [];
    for (var i = 0; i <= 20; i++) {
      for (var j = 0; j < 15; j++) {
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
  }, []);

  const handleSquareClick = (item) => {
    setSquares((currentSquares) => {
      let index = squares.findIndex(
        (square) => square.char=== item.char && square.item === item.item
      );

      let updatedSquares = [...currentSquares];
      for (const ship of ship5) {
        if (ship.char === item.char && ship.num === item.num) {
          console.log("whee");
        }
      }
      updatedSquares[index].squareHit = true;
      console.log("updated", updatedSquares[index]);
      console.log("shipt5", ship5);
      return updatedSquares;
    });
  };

  const handleStartGame = () => {
    var ship5 = [];
    var ship4 = [];
    var ship3 = [];
    function generateShip(size, shipArr) {
      var ship = [];
      var frsLetS = alphabet[Math.round(Math.random() * 14)];
      if (alphabet.indexOf(frsLetS) > 10) {
        let frsNumS = Math.round(Math.random() * 16);
        for (let i = 0; i < size; i++) {
          let ship = {};
          ship.char = frsLetS;
          ship.num = i + frsNumS;
          ship.squareShip = false;
          shipArr.push(ship);
        }
      } else {
        let frsNumS = Math.round(Math.random() * 20);
        for (let i = 0; i < size; i++) {
          let ship = {};
          ship.char = alphabet[alphabet.indexOf(frsLetS) + i];
          ship.num = frsNumS;
          ship.squareShip = false;
          shipArr.push(ship);
        }
      }
    }
    generateShip(5, ship5);
    generateShip(4, ship4);
    generateShip(3, ship3);
    setShip5(ship5);
    setShip4(ship4);
    setShip3(ship3);
    console.log("ships", ship5);
    console.log("ships", ship4);
    console.log("ships", ship3);
  };

  return (
    <>
      <Navbar />
      <GoBack />
      <h1 className="ships-header">Game area</h1>
      <button onClick={handleStartGame}>Start Game</button>

      <article id="ships-game-area-container">
        <article id="ships-computer-area">
          <section className="alphabet-container">
            {alphabet.map((item) => (
              <div className="alphabet-ships-square" key={item}>
                {item}
              </div>
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
                className={`square ${item.squareHit ? "square-hit" : ""} ${
                  item.squareShip ? "ship-hit" : ""
                }}`}
              ></div>
            ))}
          </article>
        </article>
        <article id="ships-user-area"></article>
      </article>
    </>
  );
};

export default ShipsGame;
