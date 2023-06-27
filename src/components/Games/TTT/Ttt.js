import Navbar from "../../Navbar/Navbar";
import Square from "./Square";
import { useState, useEffect } from "react";



export default function TttComponent() {
    const [game, setSquares] = useState(Array.from({ length: 9 }, (_, i) => ({
        index: i,
        clicked: false,
        value: ""
    })))
    const [userSettings, setUserSettings] = useState({
        sign: "X",
        gameMode: "easy"
    })
    const [winner, setWinner] = useState(null)
    const [isAiTurn, setIsAiTurn] = useState(false)
    const isGameStarted = game.some(item => item.value !== "");



    const checkPosition = (positions) => {
        return positions.every((index) => game[index].value === userSettings.sign)
    }

    const checkGameProgress = () => {
        const winningPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let position of winningPositions) {
            if (checkPosition(position)) {
                setWinner("You Won!")
                return true
            }
        }
        return false
    }


    const handleSquareClick = (index) => {
        if (userSettings.sign === "" || winner !== null || isAiTurn) return;

        var newGame = game.slice();
        newGame[index].value = userSettings.sign;

        setSquares(newGame);
        if (checkGameProgress()) {
            return;
        }
        setIsAiTurn(true)
        setTimeout(() => {
            var squaresNotClicked = game.filter(item => item.value === "");

            if (squaresNotClicked.length > 0) {
                var squareToChange = squaresNotClicked[Math.floor(Math.random() * squaresNotClicked.length)].index;
                newGame = game.slice();
                newGame[squareToChange].value = userSettings.sign === "X" ? "O" : "X";
                setSquares(newGame);
            }
            setIsAiTurn(false)
        }, 300);
    }

    const handleUserSettingsChange = ({ target }) => {
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
                    setWinner(null)
                }}>RESET</button>

                <section className="sign-lvl-choose-section">
                    <select className="ttt-select-container" value={userSettings.sign} name="sign" onChange={handleUserSettingsChange} disabled={isGameStarted}>
                        <option value="X">Your sign:  X</option>
                        <option value="O">Your sign:  O</option>
                    </select>
                    <select className="ttt-select-container" value={userSettings.gameMode} name="gameMode" onChange={handleUserSettingsChange} disabled={isGameStarted}>
                        <option value="easy">Difficult Level: Easy</option>
                        <option value="hard">Difficult Level: Hard</option>
                    </select>
                </section>
                <article className="ttt-game-area-container">
                    {game.map(item => (
                        <Square
                            key={item.index}
                            value={item.value}
                            onClick={() => handleSquareClick(item.index)}
                        />
                    ))}

                </article>
                {winner && <h1>{winner}</h1>}

            </article>
        </>
    );
}
