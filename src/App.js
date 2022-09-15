
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from '../src/pages/Home/Home'
import Layout from './components/Layout/Layout';
import Notes from './pages/Notes/Notes';
import Tasks from './pages/Tasks/Tasks';
import Weather from './pages/Weather/Weather';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element = {<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/weather" element={<Weather />} />
      </Route>
    </Routes>
  );
}

export default App;
