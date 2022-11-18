import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import { useState, useEffect } from "react";
import { db } from "../../firebase/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";

const Games = () => {
  const { user } = UserAuth();
  const [startGameButton, setStartGameButton] = useState("start-game-button");
  const [rpsContainer, setRpsContainer] = useState("hidden");
  const [result, setResult] = useState("");
  const [resultArticle, setResultArticle] = useState("hidden");
  const [userResult, setUserResult] = useState("");
  const [computerResult, setComputerResult] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [userIcon, setUserIcon] = useState("");
  const [computerIcon, setComputerIcon] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const dataFromFirebase = await getDoc(
          doc(db, "users", user.uid, "games", "rps")
        );
        setUserScore(dataFromFirebase.data().user);
        setComputerScore(dataFromFirebase.data().computer);
      } catch (err) {
        console.error("ERROR: ", err);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const handleStartNewGame = () => {
    setResult("");
    setRpsContainer("rps-choice-section-container");
    setResultArticle("hidden");
    setStartGameButton("hidden");
    const addGameData = async () => {
      try {
        await setDoc(doc(db, "users", user.uid, "games", "rps"), {
          user: userScore,
          computer: computerScore,
        });
      } catch (err) {
        console.error("ERROR: ", err);
      }
    };
    addGameData();
  };

  const handleChoiceClick = (e) => {
    e.preventDefault();
    var computerChoice = Math.floor(Math.random() * 3);
    var userChoice = 0;

    if (e.target.className === "fa-solid fa-gem fa-2xl") {
      userChoice = 0;
    } else if (e.target.className === "fa-regular fa-map fa-2xl") {
      userChoice = 1;
    } else if (e.target.className === "fa-solid fa-scissors fa-2xl") {
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
        setUserIcon("fa-solid fa-gem");
        setComputerIcon("fa-regular fa-map ");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setComputerScore(computerScore + 1);
      } else if (userChoice === 1 && computerChoice === 2) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setComputerIcon("fa-solid fa-scissors ");
        setUserIcon("fa-regular fa-map ");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setComputerScore(computerScore + 1);
      } else if (userChoice === 2 && computerChoice === 0) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setComputerIcon("fa-solid fa-gem");
        setUserIcon("fa-solid fa-scissors");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setComputerScore(computerScore + 1);
      } else if (userChoice === 0 && computerChoice === 2) {
        setResultArticle("result-article");
        setResult("YOU WON!");
        setUserIcon("fa-solid fa-gem");
        setComputerIcon("fa-solid fa-scissors ");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setUserScore(userScore + 1);
      } else if (userChoice === 1 && computerChoice === 0) {
        setResultArticle("result-article");
        setResult("YOU WON!");
        setUserIcon("fa-regular fa-map");
        setComputerIcon("fa-solid fa-gem");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setUserScore(userScore + 1);
      } else if (userChoice === 2 && computerChoice === 1) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setUserIcon("fa-solid fa-scissors");
        setComputerIcon("fa-regular fa-map");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setUserScore(userScore + 1);
      }
    }
  };

  return (
    <article>
      <Navbar />
      <article id="games-page-container">
        <GoBack />
        <header id="games-header">
          <h1 className="header">Rock Paper Scissors</h1>
          <h2 className="rps-ratio">
            Win/loose ratio: {userScore} / {computerScore}
          </h2>
        </header>

        <article className="rps-container">
          <section className="players">USER</section>
          <section className="players">
            <i className="fa-solid fa-robot fa-2xl"></i>
          </section>
        </article>
        <article className={rpsContainer}>
          <section onClick={handleChoiceClick} className="choice-section">
            <i className="fa-solid fa-gem fa-2xl"></i>
          </section>
          <section onClick={handleChoiceClick} className="choice-section">
            <i className="fa-regular fa-map fa-2xl"></i>
          </section>
          <section onClick={handleChoiceClick} className="choice-section">
            <i className="fa-solid fa-scissors fa-2xl"></i>
          </section>
        </article>
        <article className={resultArticle}>
          <section>
            <i className={userIcon}></i>
          </section>
          <section>
            <i className={computerIcon}></i>
          </section>
        </article>
        <h1 className="game-result-header">{result}</h1>
        <button className={startGameButton} onClick={handleStartNewGame}>
          Click to start new game!
        </button>
      </article>
    </article>
  );
};

export default Games;
