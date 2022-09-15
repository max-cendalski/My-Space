import { NavLink } from 'react-router-dom';
import Tasks from '../Tasks/Tasks'

const Home = () => {
  return (
    <article className="home-container">
      <NavLink className="feature-button" to ="/tasks" >Tasks</NavLink>
      <NavLink className="feature-button" to ="/weather" >Weather</NavLink>
    </article>
  )
}

export default Home;
