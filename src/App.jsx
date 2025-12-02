import { useState } from 'react'
import './App.css'

function Ring({level}) {

  return(
    <div className='ring' style={{height: 20+level*4, width: 200+level*60}}>{level}</div>
  )
}

function Column() {
  const [rings, setRings] = useState([1,2,3])

  return(      
      <button className='column'>
        {rings.map((ring, index) => (
          <>
          <Ring key={index} level={ring} />
          {console.log("run")}
          </>
        ))}
      </button>
  )
}

function App() {

  return (
    <>
      <h1>game</h1>
      <div className='game'>
        <Column/>
        <Column/>
        <Column/>
      </div>
    </>
  )
}

export default App
