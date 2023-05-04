import { useState, useEffect, useRef } from "react";

const ShipsComputerArea = () => {
  const [squaresC, setSquaresC] = useState([]);
  const [alphabetC, setAlphabetC] = useState([]);
  const yAxisMobileC = useRef([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);

  const ship6C = useRef([]);
  const ship5C = useRef([]);
  const ship4C = useRef([]);
  const ship3C = useRef([]);
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
    setSquaresC(arr);
    setAlphabetC(alphabet);
    console.log("computeruseEffect");
  }, []);

  const handleSquareClickC = (item) => {
    if (!gameStarted) {
      alert("click start game button");
      return;
    }

    function updateShipHitC(ship6, ship5, ship4, ship3) {
      for (let i = 0; i < ship6.length; i++) {
        if (
          ship6.current[i].char === item.char &&
          ship6.current[i].num === item.num
        ) {
          ship6.current[i].shipHit = true;
          break;
        }
      }
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

    updateShipHitC(ship6C, ship5C, ship4C, ship3C);

    setSquaresC((currentSquares) => {
      var isMatch = false;
      var index = squaresC.findIndex(
        (square) => square.num === item.num && square.char === item.char
      );
      let updatedSquares = [...currentSquares];
      ship6C.current.forEach((ele) => {
        if (isMatch) return;
        if (ele.num === item.num && ele.char === item.char) {
          ele.shipHit = true;
          updatedSquares[index].shipHit = true;
          isMatch = true;
        }
        ship5C.current.forEach((ele) => {
          if (isMatch) return;
          if (ele.num === item.num && ele.char === item.char) {
            ele.shipHit = true;
            updatedSquares[index].shipHit = true;
            isMatch = true;
          }
          ship4C.current.forEach((ele) => {
            if (isMatch) return;
            if (ele.num === item.num && ele.char === item.char) {
              ele.shipHit = true;
              updatedSquares[index].shipHit = true;
              isMatch = true;
            }
            ship3C.current.forEach((ele) => {
              if (ele.num === item.num && ele.char === item.char) {
                ele.shipHit = true;
                updatedSquares[index].shipHit = true;
                isMatch = true;
              }
            });
          });
        });
      });
      updatedSquares[index].squareHit = true;
      return updatedSquares;
    });
  };

  const handleStartGame = () => {
    setGameStarted(!gameStarted);
    var newShip6 = [];
    var newShip5 = [];
    var newShip4 = [];
    var newShip3 = [];

    function generateShipC(size, shipArr, newShip) {
      var frsLetS = alphabetC[Math.round(Math.random() * 14)];

      if (alphabetC.indexOf(frsLetS) > 10) {
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
          ship.char = alphabetC[alphabetC.indexOf(frsLetS) + i];
          ship.num = frsNumS;
          shipArr.push(ship);
          newShip.current = shipArr;
        }
      }
    }
    function checkShips() {
      var theSame = true;

      while (theSame) {
        newShip6 = [];
        newShip5 = [];
        newShip4 = [];
        newShip3 = [];
        theSame = false;
        generateShipC(6, newShip6, ship6C);
        generateShipC(5, newShip5, ship5C);
        generateShipC(4, newShip4, ship4C);
        generateShipC(3, newShip3, ship3C);
        const allShips = [...newShip6, ...newShip5, ...newShip4, ...newShip3];
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
    console.log(
      "ships",
      ship6C.current,
      ship5C.current,
      ship4C.current,
      ship3C.current
    );
  };
  return (
    <>
      <article id="ships-header-container">
        <h2>Computer's Area</h2>
        <button
          className="start-ships-game-button"
          disabled={gameStarted}
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </article>

      <article id="ships-battle-area">
        <section className="alphabet-container">
          {alphabetC.map((item) => (
            <div className="alphabet-ships-square" key={item}>
              {item}
            </div>
          ))}
        </section>
        <section id="numbers-container">
          {yAxisMobileC.current.map((item, index) => (
            <div className="numbers-square" key={index}>
              {item}
            </div>
          ))}
        </section>
        <article id="battle-area">
          {squaresC.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSquareClickC(item)}
              className={`square  ${item.shipHit ? "ship-hit" : ""}
                ${item.squareHit ? "square-hit" : ""}`}
            ></div>
          ))}
        </article>
      </article>
    </>
  );
};

export default ShipsComputerArea;
