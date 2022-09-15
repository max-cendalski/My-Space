import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <article className="home-container">
      <NavLink className="feature-button" to ="/notes" >Notes</NavLink>
      <NavLink className="feature-button" to ="/tasks" >Tasks</NavLink>
      <NavLink className="feature-button" to ="/weather" >Weather</NavLink>
    </article>
  )
}

export default Home;
