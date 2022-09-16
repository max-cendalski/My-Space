import { UserAuth } from "../../context/AuthContext"



const Navbar = () => {
  const {user, logOut} = UserAuth()
  return (
    <>
    <h1>Navbar</h1>
    {
    (user) ?
    <h2>user</h2>
    :
    <h2>No user</h2>
    }
    </>
  )
}


export default Navbar
