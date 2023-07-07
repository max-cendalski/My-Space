import { UserAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Home from '../../icons/eco-house.png'
import { useState } from 'react'
import { set } from 'date-fns'


const Navbar = () => {
  const { user, logOut } = UserAuth()
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
  const handleUserIconClick = () => {
    setIsMenuOpen(prevState => !prevState)
  }

  return (
    <article >
      {
        (user) ?
          <article className="navbar-container">
            <img src={Home} className='navbar-home-icon' onClick={goHome}></img>
            <button onClick={handleUserIconClick} className='user-icon'>
              A</button>
           
              <seciton className={isMenuOpen ? "navbar-dropdown-menu open" : "navbar-dropdown-menu"}>
                <ul>
                  <li >Account</li>
                  <li >Logout</li>
                </ul>
              </seciton>
            
          </article>
          :
          <Link className="signin-link" to="/login">SignIn</Link>
      }
    </article>
  )
}


export default Navbar
