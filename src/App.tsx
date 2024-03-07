
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/1.home/Home'
import Game from './pages/2.game/Game'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Team from './pages/3.team/Team'
import Player from './pages/4.player/Player'

function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/game" element={<Game/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/player" element={<Player/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
