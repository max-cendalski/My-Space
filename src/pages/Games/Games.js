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
  const [icons, setIcons] = useState({
    userIcon: "",
    computerIcon: "",
  });
  const [scores, setScores] = useState({
    userScore: 0,
    computerScore: 0,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const dataFromFirebase = await getDoc(
          doc(db, "users", user.uid, "games", "rps")
        );
        setScores({
          userScore: dataFromFirebase.data().user,
          computerScore: dataFromFirebase.data().computer
        });
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
          user: scores.userScore,
          computer: scores.computerScore,
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
      if (userChoice === 0) {
        setIcons({
          userIcon: "fa-solid fa-gem",
          computerIcon: "fa-solid fa-gem",
        });
      } else if (userChoice === 1) {
        setIcons({
          userIcon: "fa-solid fa-map",
          computerIcon: "fa-solid fa-map",
        });
      } else {
        setIcons({
          userIcon: "fa-solid fa-scissors",
          computerIcon: "fa-solid fa-scissors",
        });
      }
      setResultArticle("result-article");
      setResult("EVEN!");
      setStartGameButton("start-game-button");
      setRpsContainer("hidden");
    } else {
      if (userChoice === 0 && computerChoice === 1) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");

        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setIcons({
          userIcon: "fa-solid fa-gem",
          computerIcon: "fa-solid fa-map",
        });
        setScores({
          userScore:scores.userScore,
          computerScore: scores.computerScore + 1,
        });
      } else if (userChoice === 1 && computerChoice === 2) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");
        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setScores({
          userScore: scores.userScore,
          computerScore: scores.computerScore + 1,
        });
         setIcons({
           userIcon: "fa-solid fa-map",
           computerIcon: "fa-solid fa-scissors",
         });
      } else if (userChoice === 2 && computerChoice === 0) {
        setResultArticle("result-article");
        setResult("COMPUTER WON!");

        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setScores({
          userScore: scores.userScore,
          computerScore: scores.computerScore + 1,
        });
         setIcons({
          userIcon: "fa-solid fa-scissors",
          computerIcon: "fa-solid fa-gem",
        });
      } else if (userChoice === 0 && computerChoice === 2) {
        setResultArticle("result-article");
        setResult("YOU WON!");

        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setScores({
          userScore: scores.userScore + 1,
          computerScore: scores.computerScore
        });
         setIcons({
          userIcon: "fa-solid fa-gem",
          computerIcon: "fa-solid fa-scissors",
        });
      } else if (userChoice === 1 && computerChoice === 0) {
        setResultArticle("result-article");
        setResult("YOU WON!");

        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setScores({
          userScore: scores.userScore + 1,
          computerScore: scores.computerScore
        });
         setIcons({
          userIcon: "fa-solid fa-map",
          computerIcon: "fa-solid fa-gem",
        });
      } else if (userChoice === 2 && computerChoice === 1) {
        setResultArticle("result-article");
        setResult("YOU WON!");

        setRpsContainer("hidden");
        setStartGameButton("start-game-button");
        setScores({
          userScore: scores.userScore + 1,
          computerScore: scores.computerScore
        });
         setIcons({
          userIcon: "fa-solid fa-scissors",
          computerIcon: "fa-solid fa-map",
        });
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
        </header>
        <h2 className="rps-ratio">
          Win/loose ratio: {scores.userScore} / {scores.computerScore}
        </h2>
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
            <i className={icons.userIcon}></i>
          </section>
          <section>
            <i className={icons.computerIcon}></i>
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
