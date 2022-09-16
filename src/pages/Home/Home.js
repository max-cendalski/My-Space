import { NavLink } from 'react-router-dom';
import SignIn from '../../components/SignIn/SignIn';
import { UserAuth } from '../../context/AuthContext';

const Home = () => {
  const {user} = UserAuth()
  console.log('user',user)
  return (
    <article className="home-container">
      {
        (user)?
        <h3>{user.displayName}</h3>
        :
        <SignIn />
      }
      <NavLink className="feature-button" to ="/notes" >Notes</NavLink>
      <NavLink className="feature-button" to ="/tasks" >Tasks</NavLink>
      <NavLink className="feature-button" to ="/weather" >Weather</NavLink>
    </article>
  )
}

export default Home;
