import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [dataGame, setDataGame] = useState([[1],[],[]])
  const [lifting, setLifting] = useState(null)
  const [level, setLevel] = useState(0)

  useEffect(() => {
    if(upLevel())
      setLevel(prev => prev+1)
  }, [dataGame])

  useEffect(() => {
    if(dataGame[0].length === 0) {
      setDataGame((prev) => {
        const newData = [...prev]
        newData[0] = [level]
        return newData
      })} else {
        setDataGame((prev) => {
        const newData = [...prev]
        newData[1] = [level]
        return newData
      })}
  }, [level])

  function Ring({level}) {
    return(
      <div className='ring' style={{height: 20+level*4, width: 100+level*20}}>
        <p className='number'>{level}</p>
      </div>
    )
  }

  function Column({array, index, color}) {
    return(
        <button className='column' onClick={() => {
          if(lifting) {
            if(lifting < array[0] || array.length === 0) {
              setDataGame((prev) => {
                const newData = [...prev]
                newData[index] = [lifting, ...prev[index]]
                return newData
              })
              setLifting(null)
            }
          } else {
          const ring = dataGame[index][0]
          const newData = [...dataGame]
          newData[index] = dataGame[index].slice(1)
          setLifting(ring)
          setDataGame(newData)
        }}}>
          <div className='stick' style={{backgroundColor: color}}></div>
          {array.map((ring, index) => (
            <Ring key={index} level={ring} />
          ))}
        </button>
    )
  }

  return (
    <>
      <h1>game</h1>
      <div className='lifting'>{lifting && <Ring level={lifting}/>} </div>
      <div className='game'>
        {
          Array(3).fill(null).map((_, index) => (
            <Column key={index} array={dataGame[index]} index={index} color={"red"}/>
          ))
        }
      </div>
    </>
  )


  function upLevel() {
    return (
    (dataGame[0].length === 0 && dataGame[1].length === 0 ||
      dataGame[0].length === 0 && dataGame[2].length === 0 ||
      dataGame[1].length === 0 && dataGame[2].length === 0) &&
      lifting === null
    )
  }
}

export default App
