import Navbar from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";

const Games = () => {

  const handleStartNewGame = ()=> {
    console.log('whee')
  }
  return (
    <article>
      <Navbar />
      <article id="games-page-container">
        <h1>Rock Paper Scissors</h1>
        <h3>Win/loose ratio: 3/6</h3>
        <article className="rps-container">
          <section className="user-section">USER</section>
          <button className="start-game-button" onClick={handleStartNewGame}>Click to Start Game</button>
          <section className="computer-section">COMP</section>
        </article>
      </article>
    </article>
  );
};

export default Games;
