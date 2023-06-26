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


    useEffect(() => {
        var randomSquares = squares.slice()
        console.log('rand',randomSquares)
        
    },[squares])

    const handleSquareClick = (index) => {
        if (userSign === "") return
        const newSquares = squares.slice();
        newSquares[index].value = userSign

        //newSquares[index + 1].value = userSign === "X" ? "O" : "X"
        

        setSquares(newSquares);
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
                    <h3>Choose your sign </h3>
                    <button value="X" disabled={userSign} onClick={(e) => setUserSign(e.target.value)}>X</button>
                    <button value="O" disabled={userSign} onClick={(e) => setUserSign(e.target.value)}>O</button>
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
