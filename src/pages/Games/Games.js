import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";

const Games = () => {
  const [startGameButton, setStartGameButton] = useState("start-game-button");
  const [rpsContainer, setRpsContainer] = useState("hidden")
  const [result, setResult] = useState("")
  const [resultArticle, setResultArticle] = useState("hidden")
  const [startNewGameButton, setStartNewGameButton] = useState("hidden")

  const handleStartNewGame = (e) => {
    setResult("");
    setRpsContainer("rps-choice-section-container")
    setResultArticle("hidden")
    setStartGameButton("hidden")
  }



  const handleChoiceClick = (e) => {
    let computerChoice = Math.floor(Math.random() * 3);
    let userChoice = e.target.innerText
    //setStartNewGameButton("start-game-button")
    //setRpsContainer("hidden")

    if(computerChoice === 0 && userChoice === "Rock") {
      setResultArticle("result-article")
      setResult("EVEN")
      setStartGameButton("start-game-button")
    } else if (computerChoice === 0 && userChoice === "Paper") {

    } else if (computerChoice === 1 && userChoice === "Scissors") {

    }
  }
  return (
    <article>
      <Navbar />
      <article id="games-page-container">
        <h1>Rock Paper Scissors</h1>
        <h3>Win/loose ratio: 3/6</h3>
        <article className="rps-container">
          <section className="players">USER</section>
          <button className={startGameButton} onClick={handleStartNewGame}>
            Click to start new game!
          </button>
          <section className="players">COMP</section>
        </article>
        <article className={rpsContainer}>
          <section onClick={handleChoiceClick} className="choice-section">
            Rock
          </section>
          <section onClick={handleChoiceClick} className="choice-section">
            Paper
          </section>
          <section onClick={handleChoiceClick} className="choice-section">
            Scissors
          </section>
        </article>
        <article className={resultArticle}>{result}</article>
      </article>
    </article>
  );
};

export default Games;
