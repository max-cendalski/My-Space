import Navbar from "../../Navbar/Navbar";
import Square from "./Square";
import { useState, useEffect } from "react";



export default function TttComponent() {
    const [squares, setSquares] = useState(Array.from({ length: 9 }, (_, i) => ({
        index: i,
        clicked: false,
        value: ""
    })))
    const [userSign, setUserSign] = useState("")



    const handleSquareClick = (index) => {
        if (userSign === "") return;
    
        var newSquares = squares.slice();
        newSquares[index].value = userSign;
    
        setSquares(newSquares);
    
        setTimeout(() => {
            var squaresNotClicked = squares.filter(item => item.value === "");
    
            if (squaresNotClicked.length > 0) {
                var squareTochange = squaresNotClicked[Math.floor(Math.random() * squaresNotClicked.length)].index;
                newSquares = squares.slice();
                newSquares[squareTochange].value = userSign === "X" ? "O" : "X";
                setSquares(newSquares);
            }
        }, 800); 
    }
    


    return (
        <>
            <Navbar />
            <article className="ttt-container">
                <button onClick={() => {
                    const newSquares = Array.from({ length: 9 }, (_, i) => ({
                        index: i,
                        clicked: false,
                        value: ""
                    }))
                    setSquares(newSquares)
                    setUserSign("")
                }}>RESET</button>
                <section className="value-choose-section">
                    <select>
                        <option>Your sign is X</option>
                        <option>Your sign is O</option>
                    </select>
                    <select>
                    <option>Your sign is X</option>
                    <option>Your sign is O</option>
                </select>
                </section>
                <article className="ttt-game-area-container">
                    {squares.map(item => (
                        <Square
                            key={item.index}
                            value={item.value}
                            onClick={() => handleSquareClick(item.index)}
                        />
                    ))}

                </article>

            </article >
        </>
    );
}
