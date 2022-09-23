import { NavLink } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  const { user } = UserAuth();

  return (
    <article className="home-container">
      <Navbar />
      {user ? (
        <h3>{user.displayName}</h3>
      ) : (
        <article>
          <h3>You need to be signed in to use all features! </h3>
        </article>
      )}
      <NavLink className="feature-button" to="/notes">
        Notes
      </NavLink>
      <NavLink className="feature-button" to="/tasks">
        Tasks
      </NavLink>
      <NavLink className="feature-button" to="/weather">
        Weather
      </NavLink>
    </article>
  );
};

export default Home;
