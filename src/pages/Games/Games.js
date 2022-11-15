import Navbar from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";

const Games = () => {
  const [startGame,setStartGameButton] = useState('Click to Start Game')
  const handleStartNewGame = ()=> {
    setStartGameButton('Choose')
  }
  return (
    <article>
      <Navbar />
      <article id="games-page-container">
        <h1>Rock Paper Scissors</h1>
        <h3>Win/loose ratio: 3/6</h3>
        <article className="rps-container">
          <section className="players">USER</section>
          <button className="start-game-button" onClick={handleStartNewGame}>{startGame}</button>
          <section className="players">COMP</section>
        </article>
      </article>
    </article>
  );
};

export default Games;
