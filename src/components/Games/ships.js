import { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import GoBack from "../GoBack/GoBack";

const ShipsGame = () => {
  const [squares, setSquares] = useState([]);
  const [alphabet, setAlphabet] = useState([]);
  const [yAxisMobile, setYMobile] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  /*   const [ship5, setShip5] = useState([]);
  const [ship4, setShip4] = useState([]);
  const [ship3, setShip3] = useState([]); */
  const ship5R = useRef([]);
  const ship4R = useRef([]);
  const ship3R = useRef([]);

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
    console.log("whee");
  }, []);

  const handleSquareClick = (item) => {
    function updateShipHit(ship5, ship4, ship3) {
      for (let i = 0; i < ship5.length; i++) {
        if (
          ship5R.current[i].char === item.char &&
          ship5R.current[i].num === item.num
        ) {
          /*     setShip5((prevShip5) => {
            const updatedShip5 = [...prevShip5];
            updatedShip5[i] = { ...updatedShip5[i], shipHit: true };
            return updatedShip5;
          }); */
          ship5R.current[i].shipHit = true;
          break;
        }
      }

      for (let i = 0; i < ship4.length; i++) {
        if (ship4[i].char === item.char && ship4[i].num === item.num) {
          ship4R.current[i].shipHit = true;
          break;
        }
      }
      for (let i = 0; i < ship3.length; i++) {
        if (ship3[i].char === item.char && ship3[i].num === item.num) {
          ship3R.current[i].shipHit = true;

          break;
        }
      }
    }
    updateShipHit(ship5R, ship4R, ship3R);

    setSquares((currentSquares) => {
      let index = squares.findIndex(
        (square) => square.num === item.num && square.char === item.char
      );

      let updatedSquares = [...currentSquares];

      ship5R.current.forEach((ele) => {
        if (ele.num === item.num && ele.char === item.char) {
          ele.shipHit = true;
          updatedSquares[index].shipHit = true;
        }
        ship4R.current.forEach((ele) => {
          if (ele.num === item.num && ele.char === item.char) {
            ele.shipHit = true;
            updatedSquares[index].shipHit = true;
          }
          ship3R.current.forEach((ele) => {
            if (ele.num === item.num && ele.char === item.char) {
              ele.shipHit = true;
              updatedSquares[index].shipHit = true;
            }
          });
        });
      });
      /*  for (const ship of updatedShip5) {
        if (ship.num === item.num && ship.char === item.char) {
          updatedSquares[index].shipHit = true;
          ship.shipHit = true;
        }
      } */
      updatedSquares[index].squareHit = true;
      return updatedSquares;
    });
    /*   console.log("ship5R", ship5R.current);
    console.log("ship4R", ship4R.current);
    console.log("ship3R", ship3R.current);
    console.log("ships", ship5);
    console.log("ships", ship4);
    console.log("ships", ship3); */
  };

  const handleStartGame = () => {
    var ship5 = [];
    var ship4 = [];
    var ship3 = [];
    function generateShip(size, shipArr, newShip) {
      var frsLetS = alphabet[Math.round(Math.random() * 14)];
      if (alphabet.indexOf(frsLetS) > 10) {
        let frsNumS = Math.round(Math.random() * 16);
        for (let i = 0; i < size; i++) {
          let ship = {};
          ship.char = frsLetS;
          ship.num = i + frsNumS;
          shipArr.push(ship);
          newShip.current = shipArr;
        }
      } else {
        let frsNumS = Math.round(Math.random() * 20);
        for (let i = 0; i < size; i++) {
          let ship = {};
          ship.char = alphabet[alphabet.indexOf(frsLetS) + i];
          ship.num = frsNumS;
          shipArr.push(ship);
          newShip.current = shipArr;
        }
      }
    }
    generateShip(5, ship5, ship5R);
    generateShip(4, ship4, ship4);
    generateShip(3, ship3, ship3);
    /*     setShip5(ship5);
    setShip4(ship4);
    setShip3(ship3);
    ship5R.current = ship5;
    ship4R.current = ship4;
    ship3R.current = ship3; */
    ship5R.current = ship5;
    console.log("ship5R", ship5R);
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
                className={`square  ${item.shipHit ? "ship-hit" : ""}
                ${item.squareHit ? "square-hit" : ""}`}
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
