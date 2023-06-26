import Navbar from "../../Navbar/Navbar";
import Square from "./Square";
import { useState, useEffect } from "react";



export default function TttComponent() {
    const [squares, setSquares] = useState(Array.from({ length: 9 }, (_, i) => ({
        index: i,
        clicked: false,
        value: ""
    })))
    const [userSettings, setUserSettings] = useState({
        sign: "",
        gameMode: ""
    })


    const handleSquareClick = (index) => {
        if (userSettings.sign === "") return;

        var newSquares = squares.slice();
        newSquares[index].value = userSettings.sign

        setSquares(newSquares);

        setTimeout(() => {
            var squaresNotClicked = squares.filter(item => item.value === "");

            if (squaresNotClicked.length > 0) {
                var squareTochange = squaresNotClicked[Math.floor(Math.random() * squaresNotClicked.length)].index;
                newSquares = squares.slice();
                newSquares[squareTochange].value = userSettings.sign === "X" ? "O" : "X";
                setSquares(newSquares);
            }
        }, 800);
    }

    const handleSettingsChange = (e) => {
        setUserSettings((prevState)=> ({
            ...prevState, [e.target.name]: e.target.value
        }))
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
                    setUserSettings({ sign: "X", gameMode: "easy" })
                }}>RESET</button>
                <section className="sign-lvl-choose-section">
                    <select className="ttt-select-container" value={userSettings.sign} name="sign" onChange={handleSettingsChange}>
                        <option  value="X">Your sign:  X</option>
                        <option  value="O">Your sign:  O</option>
                    </select>
                    <select className="ttt-select-container" value={userSettings.gameMode} name="gameMode" onChange={handleSettingsChange}>
                        <option value="easy">Difficult Level: Easy</option>
                        <option value="hard">Difficult Level: Hard</option>
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
