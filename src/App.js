import './App.css';
import {Routes , Route} from "react-router-dom"
import Home from './pages/Home'
import Game from './pages/Game'
import Login from './pages/Login'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
