
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from '../src/pages/Home/Home';
import Layout from './components/Layout/Layout';
import Notes from './pages/Notes/Notes';
import Tasks from './pages/Tasks/Tasks';
import Weather from './pages/Weather/Weather'
import RequireAuth from './RequireAuth/RequireAuth';
import Login from './pages/Login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />

      {/*public routes*/}
        <Route index element = {<Home />} />

      {/*protected routes*/}
        <Route element={<RequireAuth />}>
          <Route path="/notes">
          <Route index element={<Notes />} />
        </Route>


        <Route path="/tasks" element={<Tasks />} />
        <Route path="/weather" element={<Weather />} />
      </Route>
    </Routes>
  );
}

export default App;
