import { UserAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import Home from '../../icons/eco-house.png'

// import { useState } from 'react'
// import { set } from 'date-fns'

const Navbar = ({ handleUserIconClick, isMenuOpen }) => {
  const { user, logOut } = UserAuth()
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

  return (
    <article >
      {
        (user) ?
          <article className="navbar-container">
            <img src={Home} className='navbar-home-icon' onClick={goHome} alt="home-icon"></img>
            <button onClick={handleUserIconClick} className='user-icon'>
              A</button>

            <seciton className={isMenuOpen ? "navbar-dropdown-menu open" : "navbar-dropdown-menu"}>
              <ul>
                <li >
                  <NavLink  to="/account">
                    Account
                  </NavLink>
                  </li>
                <li onClick={handleSignOut} >Logout</li>
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
