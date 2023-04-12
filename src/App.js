
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from '../src/pages/Home/Home';
import Layout from './components/Layout/Layout';
import Notes from './pages/Notes/Notes';
import Calendar from './pages/Calendar/Calendar';
import Weather from './pages/Weather/Weather'
import RequireAuth from './RequireAuth/RequireAuth';
import Login from './pages/Login/Login';
import EditNote from './pages/Notes/EditNote';
import Ideas from './pages/Ideas/Ideas';
import Games from './pages/Games/Games';
import RPS from './components/Games/rps'
import ShipsGame from './components/Games/ships';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />

      {/*public routes*/}
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/*protected routes*/}
      <Route element={<RequireAuth />}>
        <Route path="/notes">
          <Route index element={<Notes />} />
          <Route path="edit/:noteId" element={<EditNote />} />
        </Route>

        <Route path="/games">
          <Route  index element={<Games />} />
          <Route path="/games/rps" element={<RPS />} />
          <Route path="/games/ships" element={<ShipsGame />} />
        </Route>

        <Route path="/ideas" element={<Ideas />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/weather" element={<Weather />} />
      </Route>
    </Routes>
  );
}

export default App;
