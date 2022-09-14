
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from '../src/pages/Home/Home'
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>


      </Route>
    </Routes>

  );
}

export default App;
