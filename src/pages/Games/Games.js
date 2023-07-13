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
        <img className="icon-homepage" src={RPSIcon}></img>
      </NavLink>
      <NavLink to="/games/Ships/ships">
        <img className="icon-homepage" src={ShipIcon}></img>
      </NavLink>
      <NavLink to="/games/TTT/Ttt">
        <img className="icon-homepage" src={TTTIcon}></img>
      </NavLink>
    </article>
  );
};

export default Games;
