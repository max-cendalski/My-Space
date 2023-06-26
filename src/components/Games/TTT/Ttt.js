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
        sign: "X",
        gameMode: "easy"
    })


    useEffect(()=> {
        console.log('userSettings',userSettings)
    },[userSettings])

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

    const handleUserSettingsChange = ({ target }) => {
        let valu = squares.some(item => item.value !=="")
        console.log('value',valu)
     
        setUserSettings((prevState) => ({
            ...prevState, [target.name]: target.value
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
                }}>RESET</button>
                <section className="sign-lvl-choose-section">
                    <select className="ttt-select-container" value={userSettings.sign} name="sign" onChange={handleUserSettingsChange} disabled={ squares.some(item => item.value !=="")}>
                        <option value="X">Your sign:  X</option>
                        <option value="O">Your sign:  O</option>
                    </select>
                    <select className="ttt-select-container" value={userSettings.gameMode} name="gameMode" onChange={handleUserSettingsChange} disabled={ squares.some(item => item.value !=="")}>
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

            </article>
        </>
    );
}
