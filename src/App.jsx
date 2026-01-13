import Menu from './components/menu'
import Game from './components/game'
import About from './components/about'
import Records from './components/records'
import Auth from './components/auth'
import {BrowserRouter as Router, useLocation, Routes, Route, Link} from "react-router-dom"
import { AuthProvider } from './components/authcontext'
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



// const Back = () => {
//   const location = useLocation()

//   if(location.pathname === "/") return

//   return(
//     <Link to={"/"}><button className='forMenu'>menu</button></Link>
//   )
// }

// function App() {
//   return(
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path='/' element={<Menu />}/>
//           <Route path='/Game' element={<Game />}/>
//           <Route path='/About' element={<About />}/>
//           <Route path='/Records' element={<Records />}/>
//           <Route path='/Auth' element={<Auth />}/>
//         </Routes>  
//         <Back />
//       </Router>
//     </AuthProvider>
//   )
// }