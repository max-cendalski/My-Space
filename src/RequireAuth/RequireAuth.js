import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'

const RequireAuth = () => {
  const {user} = UserAuth()
  const location = useLocation()
  return (
    (user)
      ? <Outlet />
      : <Navigate to="/login" state={{from: location}} replace />
  );
}

export default RequireAuth;
