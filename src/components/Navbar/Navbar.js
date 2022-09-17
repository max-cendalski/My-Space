import { UserAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"



const Navbar = () => {
  const {user, logOut} = UserAuth()

   const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  return (

    <article className="navbar-container">
      {
        (user) ?
        <button onClick={handleSignOut}>Logout</button>
        :
        <Link className="signin-link" to ="/login">SignIn</Link>
      }
    </article>
  )
}


export default Navbar
