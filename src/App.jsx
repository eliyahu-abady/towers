import Menu from './componants/menu'
import Game from './componants/game'
import About from './componants/about'
import Records from './componants/records'
import { useState } from 'react'
import './App.css'



function App() {
  const [screen, setScreen] = useState("game")

  const SCREEN = {
    menu: <Menu screen={(page) => setScreen(page)}/>,
    game: <Game />,
    about: <About />,
    records: <Records />,
  }

  return(
    <>
      <div className='container'>
        {SCREEN[screen] || <div>page not found</div>}
      </div>
      {screen !== "menu" ? <button className='forMenu' onClick={() => setScreen("menu")}>menu</button> : null}
    </>
  )
}

export default App
