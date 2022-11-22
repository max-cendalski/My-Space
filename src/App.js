
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from '../src/pages/Home/Home';
import Layout from './components/Layout/Layout';
import Notes from './pages/Notes/Notes';
import Tasks from './pages/Tasks/Tasks';
import Weather from './pages/Weather/Weather'
import RequireAuth from './RequireAuth/RequireAuth';
import Login from './pages/Login/Login';
import EditNote from './pages/Notes/EditNote';
import Ideas from './pages/Ideas/Ideas';
import Games from './pages/Games/Games';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />

      {/*public routes*/}
      <Route index element = {<Home />} />
      <Route path="/login" element = {<Login />} />

      {/*protected routes*/}
      <Route element={<RequireAuth />}>
        <Route path="/notes">
          <Route index element={<Notes />} />
          <Route path="edit/:noteId" element={<EditNote />} />
        </Route>


        <Route path="/ideas" element={<Ideas />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/games" element={<Games />} />
      </Route>
    </Routes>
  );
}

export default App;
