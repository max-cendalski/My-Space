import Navbar from "../../Navbar/Navbar";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserAuth } from "../../../context/AuthContext";
import RobotIcon from "../../../icons/robot-icon.png";
import RockIcon from "../../../icons/rock-icon.png";
import ScissorsIcon from "../../../icons/scissors-icon.png";
import PaperIcon from "../../../icons/paper-icon.png";

const RPS = () => {
  const { user } = UserAuth();
  const [startGameButton, setStartGameButton] = useState("start-game-button");
  const [gameState, setGameState] = useState({
    startGameButton: "start-game-button",
    rpsChoiceSectionContainer: "hidden",
    result: "",
    resultContainer: "hidden",
  });
  const [icons, setIcons] = useState({
    userIcon: null,
    computerIcon: null,
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
          computerScore: dataFromFirebase.data().computer,
        });
      } catch (err) {
        console.error("ERROR: ", err);
      }
    };
    if (user.uid) {
      getData()
    }
    // eslint-disable-next-line
  }, [user.uid]);

  const handleStartNewGame = () => {
    setStartGameButton("hidden");
    setGameState({
      rpsChoiceSectionContainer: "rps-choice-section-container",
      result: "",
      resultContainer: "hidden",
    });

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
    setStartGameButton("start-game-button");
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
          userIcon: {PaperIcon},
          computerIcon: {PaperIcon},
        });
      } else if (userChoice === 1) {
        setIcons({
          userIcon: {PaperIcon},
          computerIcon: {PaperIcon},
        });
      } else {
        setIcons({
          userIcon: {ScissorsIcon},
          computerIcon: {ScissorsIcon},
        });
      }
      setGameState({
        rpsChoiceSectionContainer: "hidden",
        result: "EVEN!",
        resultContainer: "result-article",
      });
    } else {
      if (userChoice === 0 && computerChoice === 1) {
        setGameState({
          result: "COMPUTER WON!",
          resultContainer: "result-article",
          rpsChoiceSectionContainer: "hidden",
        });
        setIcons({// changes needed
          userIcon: RockIcon,
          computerIcon: PaperIcon,
        });
        setScores({
          userScore: scores.userScore,
          computerScore: scores.computerScore + 1,
        });
      } else if (userChoice === 1 && computerChoice === 2) {
        setGameState({
          result: "COMPUTER WON!",
          resultContainer: "result-article",
          rpsChoiceSectionContainer: "hidden",
        });
        setScores({
          userScore: scores.userScore,
          computerScore: scores.computerScore + 1,
        });
        setIcons({
          userIcon: PaperIcon,
          computerIcon: ScissorsIcon,
        });
      } else if (userChoice === 2 && computerChoice === 0) {
        setGameState({
          result: "COMPUTER WON!",
          resultContainer: "result-article",
          rpsChoiceSectionContainer: "hidden",
        });
        setScores({
          userScore: scores.userScore,
          computerScore: scores.computerScore + 1,
        });
        setIcons({
          userIcon: ScissorsIcon,
          computerIcon:RockIcon
        });
      } else if (userChoice === 0 && computerChoice === 2) {
        setGameState({
          result: "YOU WON!",
          resultContainer: "result-article",
          rpsChoiceSectionContainer: "hidden",
        });
        setScores({
          userScore: scores.userScore + 1,
          computerScore: scores.computerScore,
        });
        setIcons({
          userIcon: RockIcon,
          computerIcon: ScissorsIcon,
        });
      } else if (userChoice === 1 && computerChoice === 0) {
        setGameState({
          result: "YOU WON!",
          resultContainer: "result-article",
          rpsChoiceSectionContainer: "hidden",
        });
        setScores({
          userScore: scores.userScore + 1,
          computerScore: scores.computerScore,
        });
        setIcons({
          userIcon: PaperIcon,
          computerIcon: RockIcon,
        });
      } else if (userChoice === 2 && computerChoice === 1) {
        setGameState({
          result: "YOU WON!",
          resultContainer: "result-article",
          rpsChoiceSectionContainer: "hidden",
        });
        setScores({
          userScore: scores.userScore + 1,
          computerScore: scores.computerScore,
        });
        setIcons({
          userIcon: ScissorsIcon,
          computerIcon: PaperIcon,
        });
      }
    }
  };

  return (
    <>
      <Navbar />

      <article id="rps-game-container">
        <header id="games-header">
          <h1 className="header">Rock Paper Scissors</h1>
        </header>
        <h2 className="rps-ratio">
          Win/loose ratio: {scores.userScore} / {scores.computerScore}
        </h2>
        <article className="rps-container">
          {user.uid && <section className="players">{user.displayName.charAt(0)}</section>}
          <section>
            <img className="players" src={RobotIcon} />
          </section>
        </article>
        <article className={gameState.rpsChoiceSectionContainer}>
          <section onClick={handleChoiceClick} >
            <img src={RockIcon} alt="rock" className="rps-element" />
          </section>
          <section onClick={handleChoiceClick} >
            <img src={PaperIcon} alt="paper" className="rps-element"/>
          </section>
          <section onClick={handleChoiceClick} >
            <img src={ScissorsIcon} alt="scissors" className="rps-element" />
          </section>
        </article>

        <article className={gameState.resultContainer}>
          <section>
            <img className="choosen-element" src={icons.userIcon} alt="user-choosen-icon" />
          </section>
          <section>
            <img className="choosen-element" src={icons.computerIcon} alt="computer-choosen-icon" />
          </section>
        </article>
        <h1 className="game-result-header">{gameState.result}</h1>
        <button className={startGameButton} onClick={handleStartNewGame}>
          Click to start new game!
        </button>
      </article>
    </>
  );
};

export default RPS;
