import  Navbar  from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
