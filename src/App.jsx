import Menu from './componants/menu'
import Game from './componants/game'
import About from './componants/about'
import Records from './componants/records'
import { useEffect, useState } from 'react'
import './App.css'



function App() {
  const [screen, setScreen] = useState("game")

  const SCREEN = {
    menu: <Menu />,
    game: <Game />,
    about: <About />,
    records: <Records />,
  }

  return(
    <div className='container'>
      {SCREEN[screen] || <div>page not found</div>}
    </div>
  )
}

export default App
