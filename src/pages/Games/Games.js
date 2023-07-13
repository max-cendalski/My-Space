import Navbar from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import RPSIcon from "../../icons/rps-icon.png";
import ShipIcon from "../../icons/ships-icon.png";
import TTTIcon from "../../icons/ttt-icon.png";

const Games = () => {
  return (
    <article id="icons-games-container">
      <Navbar />
      <NavLink to="/games/rps">
        <img className="icon-homepage" src={RPSIcon} alt="rock-paper-scissors"></img>
      </NavLink>
      <NavLink to="/games/Ships/ships">
        <img className="icon-homepage" src={ShipIcon} alt="ship"></img>
      </NavLink>
      <NavLink to="/games/TTT/Ttt">
        <img className="icon-homepage" src={TTTIcon} alt="tic-tac-toe"></img>
      </NavLink>
    </article>
  );
};

export default Games;
