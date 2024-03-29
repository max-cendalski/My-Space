import { Route, Routes as Router } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Account from '../pages/Account/Account';
import Layout from '../components/Layout/Layout';
import Notes from '../pages/Notes/Notes';
import CalendarHomePage from '../pages/Calendar/Calendar'
import Weather from '../pages/Weather/Weather'
import RequireAuth from '../RequireAuth/RequireAuth';
import Login from '../pages/Login/Login';
import EditNote from '../pages/Notes/EditNote';
import Quotes from '../pages/Quotes/Quotes';
import Games from '../pages/Games/Games';
import RPS from '../components/Games/RPS/rps';
import ShipsGame from '../components/Games/Ships/ships';
import TttComponent from '../components/Games/TTT/Ttt';
import NotFound from '../pages/NotFound';
import AppGuide from '../pages/AppGuide/AppGuide';
import PrivacyPolicy from '../components/Privacy/Privacy-Policy';


const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Layout />} />

      {/*public routes*/}
      <Route path="/login" element={<Login />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      {/*protected routes*/}
      <Route element={<RequireAuth />}>

        <Route index element={<Home />} />
        <Route path="/account" element={<Account />}></Route>
        <Route path="/app-guide" element={<AppGuide />}></Route>
        <Route path="/notes">
          <Route index element={<Notes />} />
          <Route path="edit/:noteId" element={<EditNote />} />
        </Route>

        <Route path="/games">
          <Route index element={<Games />} />
          <Route path="/games/rps" element={<RPS />} />
          <Route path="/games/Ships/ships" element={<ShipsGame />} />
          <Route path="/games/TTT/Ttt" element={<TttComponent />} />

        </Route>

        <Route path="/quotes" element={<Quotes />} />
        <Route path="/calendar" element={<CalendarHomePage />} />
        <Route path="/weather" element={<Weather />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Router>
  );
}

export default Routes;