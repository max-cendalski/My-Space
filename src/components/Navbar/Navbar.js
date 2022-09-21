import { UserAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


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
    navigate('/')
  }

  return (
    <article className="navbar-container">
      {
        (user) ?
        <article>
          <button onClick={goHome}>Home</button>
          <button onClick={handleSignOut}>Logout</button>
        </article>
        :
        <Link className="signin-link" to ="/login">SignIn</Link>
      }
    </article>
  )
}


export default Navbar
