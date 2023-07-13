import { UserAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import Home from '../../icons/eco-house.png'


const Navbar = () => {
  const navigate = useNavigate()
  const { user, logOut } = UserAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.navbar-dropdown-menu')) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleUserIconClick = (e) => {
    e.stopPropagation()
    setIsMenuOpen(prevState => !prevState);
  };

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
    <>
      {
        (user) ?
          <article
            onMouseLeave={() => setIsMenuOpen(false)}
            className="navbar-container"
          >
            <img src={Home} className='navbar-home-icon' onClick={goHome} alt="home-icon"></img>
            {user.uid &&
              <button
                onMouseEnter={() => setIsMenuOpen(true)}
                onClick={handleUserIconClick}
                className='user-icon'
              >
                {user.displayName.charAt(0)}
              </button>
            }

            <section className={isMenuOpen ? "navbar-dropdown-menu active" : "navbar-dropdown-menu"}>
              <ul
              >
                <li >
                  <NavLink to="/account">
                    Account
                  </NavLink>
                </li>
                <li onClick={handleSignOut}>Sign Out</li>
              </ul>
            </section>
          </article>
          :
          <Link className="signin-link" to="/login">SignIn</Link>
      }
    </>
  )
}


export default Navbar
