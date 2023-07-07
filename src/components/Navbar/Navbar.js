import { UserAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


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
          <button onClick={goHome}>Home</button>
          <button onClick={handleSignOut}>Logout</button>
          <button onClick={handleUserIconClick} className='user-icon'>
          {user.displayName.charAt(0)}</button>
        </article>
        :
        <Link className="signin-link" to ="/login">SignIn</Link>
      }
    </article>
  )
}


export default Navbar
