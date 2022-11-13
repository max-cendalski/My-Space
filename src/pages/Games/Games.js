import Navbar from "../../components/Navbar/Navbar"

const Games = () => {
  return (
    <article className="games-container">
      <Navbar />
      <article className="rps-container">
        <h1>Rock Paper Scissors</h1>

        <h3>Win/loose ratio: 3/6</h3>
        <button>Click to Start Game</button>
        <section className="user-section"></section>
        <section className="computer-section"></section>
      </article>
    </article>
  );
}


export default Games
