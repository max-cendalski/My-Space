import { UserAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import Home from '../../icons/eco-house.png'


const Navbar = () => {
  const { user, logOut } = UserAuth()
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)


  useEffect(() => {
    const handleOutsideClick = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const handleUserIconClick = (e) => {
    e.stopPropagation();
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
    <article >
      {
        (user) ?
          <article className="navbar-container">
            <img src={Home} className='navbar-home-icon' onClick={goHome} alt="home-icon"></img>
            {user.uid && <button
              onClick={handleUserIconClick}
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
              className='user-icon'
            >
              {user.displayName.charAt(0)}
            </button>
            }

            <section className={isMenuOpen ? "navbar-dropdown-menu open" : "navbar-dropdown-menu"}>
              <ul>
                <li >
                  <NavLink to="/account">
                    Account
                  </NavLink>
                </li>
                <li onClick={handleSignOut} >Logout</li>
              </ul>
            </section>

          </article>
          :
          <Link className="signin-link" to="/login">SignIn</Link>
      }
    </article>
  )
}


export default Navbar
