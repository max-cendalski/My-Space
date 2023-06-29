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
        //esl-no-lint
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
        if (userSettings.sign === "" || winner !== null || isAiTurn) return;
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
                if (squaresNotClicked.length > 0 && squaresNotClicked.length > 6) {
                   
                    var squareToClick = squaresNotClicked[Math.floor(Math.random() * squaresNotClicked.length)].index

                    let newGame = game.slice();

                    newGame[squareToClick].value = userSettings.sign === "X" ? "O" : "X";
                    const win = checkWinner();
                    if (win) {
                        setIsAiTurn(false)
                        setWinner(win);
                        return;
                    }
                    setGameSquares(newGame);
                } else {
                    console.log('game second phase', game)
                    console.log('userSe',userSettings.sign)
                    let computerSign = userSettings.sign === "X" ? "O" : "X"
                    let computerClickedSquares  = game.filter(item=> item.value === computerSign && item.value !=="")
                    let userClickedSquares = game.filter(item=> item.value === userSettings.sign && item.value !=="")
                    
                    console.log('userClicked',userClickedSquares)
                    console.log('computerClicked', computerClickedSquares)












                }
                setIsAiTurn(false)
            }, 500);



        }









        // var newGame = game.slice();
        // newGame[index].value = userSettings.sign;
        // const win = checkWinner();
        // if (win) {
        //     setWinner(win);
        //     return;
        // }
        // setIsAiTurn(true)

        // setTimeout(() => {
        //     var squaresNotClicked = game.filter(item => item.value === "");
        //     if (squaresNotClicked.length > 0) {
        //         var squareToChange = squaresNotClicked[Math.floor(Math.random() * squaresNotClicked.length)].index;
        //         newGame = game.slice();
        //         newGame[squareToChange].value = userSettings.sign === "X" ? "O" : "X";
        //         const win = checkWinner();
        //         if (win) {
        //             setIsAiTurn(false)
        //             setWinner(win);
        //             return;
        //         }
        //         setGameSquares(newGame);
        //     }
        //     setIsAiTurn(false)
        // }, 500);
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
                <button onClick={() => {
                    const newSquares = Array.from({ length: 9 }, (_, i) => ({
                        index: i,
                        clicked: false,
                        value: ""
                    }))
                    setGameSquares(newSquares)
                    setWinner(null)
                    setWinningSequence(null)
                    setUserSettings({
                        sign: "X",
                        gameMode: "easy"
                    })
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
                    {game.map((item, i) => (
                        <Square
                            key={item.index}
                            value={item.value}
                            onClick={() => handleSquareClick(item.index)}
                            winningLine={winningSequence ? getWinningLineClassName(winningSequence) : ''}
                        />
                    ))}

                </article>
                {winner && <h1>{winner}</h1>}

            </article>
        </>
    );
}
