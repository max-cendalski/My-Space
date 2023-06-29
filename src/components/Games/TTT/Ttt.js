import Navbar from "../../Navbar/Navbar";
import Square from "./Square";
import { useState, useEffect } from "react";



export default function TttComponent() {
    const [game, setGameSquares] = useState(Array.from({ length: 9 }, (_, i) => ({
        index: i,
        clicked: false,
        value: ""
    })))
    const [userSettings, setUserSettings] = useState({
        sign: "X",
        gameMode: "easy"
    })
    const [winner, setWinner] = useState(false)
    const [isAiTurn, setIsAiTurn] = useState(false)
    const isGameStarted = game.some(item => item.value !== "");
    const [winningSequence, setWinningSequence] = useState(null);

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
    useEffect(() => {
        if (userSettings.gameMode === "hard") {
            var newGame = game.slice()
            newGame[4] = { index: 4, clicked: true, value: userSettings.sign === "X" ? "O" : "X" }
            setGameSquares(newGame)
        }
        //eslint-disable-next-line
    }, [userSettings.gameMode])

    const checkWinner = () => {
        const player = userSettings.sign
        const computer = userSettings.sign === "X" ? "O" : "X";

        for (let position of winningPositions) {
            if (checkPosition(position, player)) {
                setWinningSequence(position)
                return "You Won!"
            }
            else if (checkPosition(position, computer)) {
                setWinningSequence(position)
                return "Computer Won!";
            }
        }
        return null;
    }

    const checkPosition = (positions, player) => {
        return positions.every((index) => game[index].value === player)
    }

    const handleSquareClick = (index) => {
        if (winner !== null || isAiTurn) return;
        if (userSettings.gameMode === "hard") {
            let newGame = game.slice()
            newGame[index].value = userSettings.sign
            const win = checkWinner();
            if (win) {
                setWinner(win);
                return;
            }
            setIsAiTurn(true)
            setTimeout(() => {
                var squaresNotClicked = game.filter(item => item.value === "");
                if (squaresNotClicked.length > 0 && squaresNotClicked.length > 7) {

                    let squareToClick = squaresNotClicked[Math.floor(Math.random() * squaresNotClicked.length)].index
                    const newGame = game.slice();
                    newGame[squareToClick].value = userSettings.sign === "X" ? "O" : "X";
                    setGameSquares(newGame);
                } else {
                    if (game.filter(item => item.value === "").length === 1) {
                        setWinner("Even!")
                    }
                    let computerSign = userSettings.sign === "X" ? "O" : "X"

                    let computerClickedSquares = game.filter(item => item.value === computerSign).map(item => item.index);
                    let userClickedSquares = game.filter(item => item.value === userSettings.sign).map(item => item.index);

                    let aiMove = -1;  // Initialize AI move index

                    for (let i = 0; i < winningPositions.length; i++) {
                        let userMatch = 0;
                        let emptyIndex = -1;

                        for (let j = 0; j < winningPositions[i].length; j++) {
                            if (userClickedSquares.includes(winningPositions[i][j])) {
                                userMatch++;
                            } else if (!computerClickedSquares.includes(winningPositions[i][j])) {
                                emptyIndex = winningPositions[i][j];
                            }
                        }
                        if (userMatch === 2 && emptyIndex !== -1) {
                            aiMove = emptyIndex;
                            break;
                        }
                    }


                    if (aiMove === -1) {
                        for (let i = 0; i < winningPositions.length; i++) {
                            let computerMatch = 0;
                            let emptyIndices = [];

                            for (let j = 0; j < winningPositions[i].length; j++) {
                                if (computerClickedSquares.includes(winningPositions[i][j])) {
                                    computerMatch++;
                                } else if (!userClickedSquares.includes(winningPositions[i][j])) {
                                    emptyIndices.push(winningPositions[i][j]);
                                }
                            }
                            if (computerMatch === 1 && emptyIndices.length === 2) {
                                aiMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                                break;
                            }
                        }
                    }

                    for (let i = 0; i < winningPositions.length; i++) { //check if computer can win
                        let computerMatch = 0;
                        let emptyIndex = -1;

                        for (let j = 0; j < winningPositions[i].length; j++) {
                            if (computerClickedSquares.includes(winningPositions[i][j])) {
                                computerMatch++;
                            } else if (!userClickedSquares.includes(winningPositions[i][j])) {
                                emptyIndex = winningPositions[i][j];
                            }
                        }
                        if (computerMatch === 2 && emptyIndex !== -1) { //Two computer clicks and third position is empty. Computer wins
                            aiMove = emptyIndex;
                            break;
                        }
                    }


                    if (aiMove === -1) { // Random
                        let emptySquares = game.filter(item => item.value === "").map(item => item.index);
                        if (emptySquares.length > 0) {
                            aiMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
                        }
                    }


                    if (aiMove !== -1) { // update state
                        let newGame = [...game];
                        newGame[aiMove].value = computerSign;
                        newGame[aiMove].clicked = true;
                        setGameSquares(newGame);
                    }
                    const win = checkWinner();
                    if (win) {
                        setIsAiTurn(false)
                        setWinner(win);
                        return;
                    }

                }
                setIsAiTurn(false)
            }, 500);

        } else {
            console.log('whe2')
            var newGame = game.slice();
            newGame[index].value = userSettings.sign;
            const win = checkWinner();
            if (win) {
                setWinner(win);
                return;
            }
            setIsAiTurn(true)

            setTimeout(() => {
                var squaresNotClicked = game.filter(item => item.value === "");
                if (squaresNotClicked.length > 0) {
                    var squareToChange = squaresNotClicked[Math.floor(Math.random() * squaresNotClicked.length)].index;
                    newGame = game.slice();
                    newGame[squareToChange].value = userSettings.sign === "X" ? "O" : "X";
                    const win = checkWinner();
                    if (win) {
                        setIsAiTurn(false)
                        setWinner(win);
                        return;
                    }
                    setGameSquares(newGame);
                }
                setIsAiTurn(false)
            }, 500);
        }

    }

    const handleUserSettingsChange = ({ target }) => {
        setUserSettings((prevState) => ({
            ...prevState, [target.name]: target.value
        }))
    }

    function getWinningLineClassName(winningSequence) {
        if (JSON.stringify(winningSequence) === JSON.stringify([0, 1, 2])) return 'line-horizontal-top';
        if (JSON.stringify(winningSequence) === JSON.stringify([3, 4, 5])) return 'line-horizontal-middle';
        if (JSON.stringify(winningSequence) === JSON.stringify([6, 7, 8])) return 'line-horizontal-bottom';
        if (JSON.stringify(winningSequence) === JSON.stringify([0, 3, 6])) return 'line-vertical-left';
        if (JSON.stringify(winningSequence) === JSON.stringify([1, 4, 7])) return 'line-vertical-middle';
        if (JSON.stringify(winningSequence) === JSON.stringify([2, 5, 8])) return 'line-vertical-right';
        if (JSON.stringify(winningSequence) === JSON.stringify([0, 4, 8])) return 'line-diagonal-left';
        if (JSON.stringify(winningSequence) === JSON.stringify([2, 4, 6])) return 'line-diagonal-right';
    }

    return (
        <>
            <Navbar />
            <article className="ttt-container">
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
                    {game.map((item, i) => (
                        <Square
                            key={item.index}
                            value={item.value}
                            onClick={() => handleSquareClick(item.index)}
                            winningLine={winningSequence ? getWinningLineClassName(winningSequence) : ''}
                        />
                    ))}

                </article>
                <button className="reset-ttt" onClick={() => {
                    console.log('button clicked')
                    const newSquares = Array.from({ length: 9 }, (_, i) => ({
                        index: i,
                        clicked: false,
                        value: ""
                    }))
                    setGameSquares(newSquares)
                    setUserSettings({
                        sign: "X",
                        gameMode: "easy"
                    })
                    setWinner(null)
                    setWinningSequence(null)
                }}>RESET GAME</button>
                {winner && <h1>{winner}</h1>}

            </article>
        </>
    );
}
