import Navbar from "../../components/Navbar/Navbar";

const Games = () => {
  return (
    <article>
      <Navbar />
      <article id="games-page-container">
        <h1>Rock Paper Scissors</h1>
        <h3>Win/loose ratio: 3/6</h3>
        <article className="rps-container">
          <button>Click to Start Game</button>
          <section className="user-section"></section>
          <section className="computer-section"></section>
        </article>
      </article>
    </article>
  );
};

export default Games;
