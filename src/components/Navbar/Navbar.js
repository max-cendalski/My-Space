import { UserAuth } from "../../context/AuthContext"



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
      <h1>Navbar</h1>
      {
        (user) ?
        <button onClick={handleSignOut}>Logout</button>
        :
        <h2>No user</h2>
      }
    </article>
  )
}


export default Navbar
