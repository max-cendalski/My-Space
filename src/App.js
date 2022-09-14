
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from '../src/pages/Home/Home'
import Layout from './components/Layout/Layout';
import Tasks from './pages/Tasks/Tasks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}

export default App;
