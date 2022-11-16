import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";

const Games = () => {
  const [startGameButton, setStartGameButton] = useState("start-game-button");
  const [rpsContainer, setRpsContainer] = useState("hidden");
  const [result, setResult] = useState("");
  const [resultArticle, setResultArticle] = useState("hidden");
  const [userResult, setUserResult] = useState("");
  const [computerResult, setComputerResult] = useState("");
  const [userScore, setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)

  const handleStartNewGame = () => {
    setResult("");
    setRpsContainer("rps-choice-section-container");
    setResultArticle("hidden");
    setStartGameButton("hidden");
  };

  const handleChoiceClick = (e) => {
    e.preventDefault();
    var computerChoice = Math.floor(Math.random() * 3);
    var userChoice = 0;

    if (e.target.innerText === "Rock") {
      userChoice = 0;
    } else if (e.target.innerText === "Paper") {
      userChoice = 1;
    } else if (e.target.innerText === "Scissors") {
      userChoice = 2;
    }

    if (userChoice === computerChoice) {
      var even = "";
      if (userChoice === 0) {
        even = "Rock";
      } else if (userChoice === 1) {
        even = "Paper";
      } else {
        even = "Scissors";
      }
      setResultArticle("result-article");
      setResult("EVEN");
      setComputerResult(even);
      setUserResult(even);
      setStartGameButton("start-game-button");
      setRpsContainer("hidden");
    } else {
      if (userChoice === 0 && computerChoice === 1) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setComputerResult("Paper");
        setUserResult("Rock");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setComputerScore(userScore+1)


      } else if (userChoice === 1 && computerChoice === 2) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setComputerResult("Scissors");
        setUserResult("Paper");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setComputerScore(userScore + 1);


      } else if (userChoice === 2 && computerChoice === 0) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setComputerResult("Rock");
        setUserResult("Scissors");
        setRpsContainer("hidden");
         setStartGameButton("start-game-button");
        setComputerScore(userScore + 1);


      } else if (userChoice === 0 && computerChoice === 2) {
        setResultArticle("result-article");
        setResult("YOU WON!");
        setUserResult("Rock");
        setComputerResult("Scissors");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setUserScore(userScore + 1);

      } else if (userChoice === 1 && computerChoice === 0) {
        setResultArticle("result-article");
        setResult("YOU WON!");
        setUserResult("Paper");
        setComputerResult("Rock");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setUserScore(userScore + 1);

      } else if (userChoice === 2 && computerChoice === 1) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setUserResult("Scissors");
        setComputerResult("Paper");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setUserScore(userScore + 1);

      }
      console.log("userScore", userScore);
    }
  };
  return (
    <article>
      <Navbar />
      <article id="games-page-container">
        <h1>Rock Paper Scissors</h1>
        <h3>Win/loose ratio: {userScore} / {computerScore}</h3>
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
