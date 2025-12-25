import Menu from './componants/menu'
import Game from './componants/game'
import About from './componants/about'
import Records from './componants/records'
import Auth from './componants/auth'
import { AuthProvider } from './componants/authcontext'
import { useState } from 'react'
import './App.css'



function App() {
  const [screen, setScreen] = useState("menu")

  const renderPage = () => {
    switch (screen) {
      case "menu": return <Menu setScreen={(page) => setScreen(page)} />;
      case "game": return <Game />;
      case "about": return <About />;
      case "records": return <Records />;
      case "auth": return <Auth />;
      default: return <div>Page not found</div>;
    }
  }

  return(
    <AuthProvider>
      <div className='container'>
        {renderPage()}
      </div>
      {screen !== "menu" ? <button className='forMenu' onClick={() => setScreen("menu")}>menu</button> : null}
    </AuthProvider>
  )
}

export default App