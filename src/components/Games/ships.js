import { useState, useEffect} from "react";

const Ships = () => {
const [squares, setSquares] = useState([]);
const [alphabet, setAlphabet] = useState([]);
const [yAxis, setYAxis] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    let arr = [];
    for (var i = 0; i <= 10; i++) {
      for (var j = 0; j < 26; j++) {
        arr.push({ char: alphabet[j], num: i });
      }
    }

    setSquares(arr);
    setAlphabet(alphabet);
  }, []);


  return (
   <article className="ships">
        <h1>Game area</h1>
      </article>
      <article id="game-area-container">
        <section className="alphabet-container">
          {alphabet.map((item) => (
            <div className="alphabet-square">{item}</div>
          ))}
        </section>
        <section id="numbers-container">
          {yAxis.map((item, index) => (
            <div className="numbers-square" key={index}>
              {item}
            </div>
          ))}
        </section>
        <article id="game-area">
          {squares.map((item) => (
            <div
              onClick={() => handleSquareClick(item)}
              className="square"
            ></div>
          ))}
        </article>
      </article>
  )
}

export default Ships;
