import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";

const Games = () => {
  const [startGameButton, setStartGameButton] = useState("start-game-button");
  const [rpsContainer, setRpsContainer] = useState("hidden");
  const [result, setResult] = useState("");
  const [resultArticle, setResultArticle] = useState("hidden");
  const [userResult, setUserResult] = useState("")
  const [computerResult, setComputerResult] = useState("")


  const handleStartNewGame = (e) => {
    setResult("");
    setRpsContainer("rps-choice-section-container");
    setResultArticle("hidden");
    setStartGameButton("hidden");
  };

  const handleChoiceClick = (e) => {
    var computerChoice = Math.floor(Math.random() * 3);
    var userChoice = 0;
    if (e.target.innerText === "Rock") {
      userChoice = 0;
    } else if (e.target.innerText === "Paper") {
      userChoice = 1;
    } else if (e.target.innerText === "Scissors") {
      userChoice = 2;
    }
    console.log("user,computer:", userChoice, computerChoice);
    if (userChoice === computerChoice) {
      let even = ""
      if (userChoice === 0) {
        even = "Paper"
      } else if (userChoice ===1) {
        even = "Rock"
      } else {
        even = "Scissors"
      }
      setResultArticle("result-article");
      setResult("EVEN");
      setComputerResult(even)
      setUserResult(even)
    } else {
      if (userChoice === 0 && computerChoice === 1) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setComputerResult("Paper")
        setUserResult("Rock")
      } else if (userChoice === 1 && computerChoice === 2) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setComputerResult("Scissors");
        setUserResult("Paper");

      } else if (userChoice === 2 && computerChoice === 0) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setComputerResult("Rock");
        setUserResult("Scissors");

      } else if (userChoice === 0 && computerChoice === 2) {
        setResultArticle("result-article");
        setResult("YOU WON!");
        setUserResult("Rock");

      } else if (userChoice === 1 && computerChoice === 0) {
        setResultArticle("result-article");
        setResult("YOU WON!");
        setUserResult("Paper");

      } else if (userChoice === 2 && computerChoice === 1) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setUserResult("Scissors");
      }
    }
  };
  return (
    <article>
      <Navbar />
      <article id="games-page-container">
        <h1>Rock Paper Scissors</h1>
        <h3>Win/loose ratio: 3/6</h3>
        <article className="rps-container">
          <section className="players">USER</section>

          <section className="players">COMP</section>
        </article>
        <button className={startGameButton} onClick={handleStartNewGame}>
          Click to start new game!
        </button>
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
        <article></article>
        <article className={resultArticle}>
          <section className="game-result">{userResult}</section>
          <section className="game-result">{computerResult}</section>
        </article>
        <h1>{result}</h1>
      </article>
    </article>
  );
};

export default Games;
