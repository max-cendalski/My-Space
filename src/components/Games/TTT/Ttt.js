import Navbar from "../../Navbar/Navbar";
import Square from "./Square";
import { useState, useEffect } from "react";



export default function TttComponent() {
    const [squares, setSquares] = useState(Array.from({ length: 9 }, (_, i) => ({
        index: i,
        clicked: false,
        value: ""
      })))           
    //const [isXNext, setIsXNext] = useState(true);

    useEffect(() => {
        console.log('squares', squares)
    })

    function handleClick(index) {
        // if (squares[index] !== null) {
        //     return;
        // }
        console.log('index',index)
        const newSquares = squares.slice(); // Copy the array
        newSquares[index].value = "X"// = isXNext ? "X" : "O"; // Fill the clicked square with 'X' or 'O'

        // Update the squares state
        setSquares(newSquares);

        // Switch the player
        //setIsXNext(!isXNext);
    }

    return (
        <>
            <Navbar />
            <article className="ttt-container">
                <button onClick={() => setSquares(Array.from({ length: 9 }, (_, i) => ({
                    index: i,
                    clicked: false,
                    value: ""
                  })))}>RESET</button>
                <article className="ttt-game-area-container">
                    {squares.map(item => (
                        <Square
                            key={item.index}
                            value={item.value}
                            onClick={() => handleClick(item.index)}
                        />
                    ))}

                </article>

            </article>
        </>
    );
}
