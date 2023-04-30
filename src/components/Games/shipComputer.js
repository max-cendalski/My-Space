import { useState, useEffect, useRef } from "react";


const ShipsComputerArea = () => {
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
    console.log("whe");
  }, []);

  const handleSquareClick = (item) => {
    setGameStarted(true);
    function updateShipHit(ship5, ship4, ship3) {
      for (let i = 0; i < ship5.length; i++) {
        if (
          ship5.current[i].char === item.char &&
          ship5.current[i].num === item.num
        ) {
          ship5.current[i].shipHit = true;
          break;
        }
      }
      for (let i = 0; i < ship4.length; i++) {
        if (ship4[i].char === item.char && ship4[i].num === item.num) {
          ship4.current[i].shipHit = true;
          break;
        }
      }
      for (let i = 0; i < ship3.length; i++) {
        if (ship3[i].char === item.char && ship3[i].num === item.num) {
          ship3.current[i].shipHit = true;
          break;
        }
      }
    }

    updateShipHit(ship5, ship4, ship3);

    setSquares((currentSquares) => {
      var isMatch = false;
      var index = squares.findIndex(
        (square) => square.num === item.num && square.char === item.char
      );
      let updatedSquares = [...currentSquares];

      ship5.current.forEach((ele) => {
        if (isMatch) return;
        if (ele.num === item.num && ele.char === item.char) {
          ele.shipHit = true;
          updatedSquares[index].shipHit = true;
          isMatch = true;
        }
        ship4.current.forEach((ele) => {
          if (isMatch) return;
          if (ele.num === item.num && ele.char === item.char) {
            ele.shipHit = true;
            updatedSquares[index].shipHit = true;
            isMatch = true;
          }
          ship3.current.forEach((ele) => {
            if (ele.num === item.num && ele.char === item.char) {
              ele.shipHit = true;
              updatedSquares[index].shipHit = true;
              isMatch = true;
            }
          });
        });
      });
      updatedSquares[index].squareHit = true;
      return updatedSquares;
    });
  };

  const handleStartGame = () => {
    setGameStarted(!gameStarted);
    var newShip5 = [];
    var newShip4 = [];
    var newShip3 = [];

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
    function checkShips() {
      var theSame = true;

      while (theSame) {
        newShip5 = [];
        newShip4 = [];
        newShip3 = [];
        theSame = false;
        generateShip(5, newShip5, ship5);
        generateShip(4, newShip4, ship4);
        generateShip(3, newShip3, ship3);
        const allShips = [...newShip5, ...newShip4, ...newShip3];
        loop1: for (let i = 0; i < allShips.length - 1; i++) {
          let obj1 = allShips[i];
          for (let j = i + 1; j < allShips.length; j++) {
            let obj2 = allShips[j];
            if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
              theSame = true;
              break loop1;
            }
          }
        }
      }
    }
    checkShips();
    console.log("shipt", ship5.current);
  };
  return (
    <>
      <article id="ships-header">
        <h1 className="ships-header">Game area</h1>
        <button
          className="start-ships-game-button"
          disabled={gameStarted}
          onClick={handleStartGame}
        >
          Start Game
        </button>
        <h2>Enemy's Area</h2>
      </article>

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
            {yAxisMobile.current.map((item, index) => (
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
      </article>
    </>
  );
};

export default ShipsComputerArea;
