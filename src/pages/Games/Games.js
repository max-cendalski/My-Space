import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import { NavLink } from "react-router-dom";

const Games = () => {
  return (
    <article>
      <Navbar />
      <GoBack />
      <h1 id="games-header">Games</h1>
      <NavLink className="game-link-button" to="/games/Ships/rps">
        RPS
      </NavLink>
      <NavLink className="game-link-button" to="/games/Ships/ships">
        SHIPS
      </NavLink>
    </article>
  );
};

export default Games;
