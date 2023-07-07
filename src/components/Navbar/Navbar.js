import { UserAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Home from '../../icons/eco-house.png'


const Navbar = () => {
  const {user, logOut} = UserAuth()
  const navigate = useNavigate()

   const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  const goHome = () => {
    navigate("/")
  }
  const handleUserIconClick = ()=> {
    console.log('userv',user)
  }

  return (
    <article >
      {
        (user) ?
        <article className="navbar-container">
          <img src ={Home} className='navbar-home-icon' onClick={goHome}></img>
          <button onClick={handleUserIconClick} className='user-icon'>
          A</button>
        </article>
        :
        <Link className="signin-link" to ="/login">SignIn</Link>
      }
    </article>
  )
}


export default Navbar
