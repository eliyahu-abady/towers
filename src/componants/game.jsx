import { useState, useEffect } from "react"

function Game() {
  const [dataGame, setDataGame] = useState([[1],[],[]])
  const [lifting, setLifting] = useState(null)
  const [level, setLevel] = useState(1)
  const [timer, setTimer] = useState(0)

  const lift = (index) => {
    if(dataGame[index].length === 0)
      return
    const ring = dataGame[index][0]
    setLifting(ring)
    setDataGame((prev) => {
      const newData = [...prev]
      newData[index] = prev[index].slice(1)
      return newData
    })
}

  const place = (index) => {
    if(lifting < dataGame[index][0] || dataGame[index].length === 0) {
        setDataGame((prev) => {
          const newData = [...prev]
          newData[index] = [lifting, ...prev[index]]
          return newData
        })
        setLifting(null)
    }
  }

  const handleClickColumn = (index) => {
    if(index>2 || index<0)
      return
    if(lifting) {place(index)}
    else {lift(index)}
  }
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = parseInt(event.key-1)
      handleClickColumn(key)
    } 
    window.addEventListener("keydown", handleKeyDown)
    return() => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [dataGame])

  useEffect(() => {
    if(upLevel()) {
      const newLevel = level+1
      setLevel(newLevel)
      setDataGame((prev) => {
        const newData = [...prev]
        const targetIndex = dataGame[0].length === 0 ? 0 : 1
        newData[targetIndex] = [newLevel]
        return newData
      })
  }}, [dataGame])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => prev+1)
    }, 10);
    return () => {
      clearInterval(intervalId)
    }
  })

  function Ring({level}) {
    return(
      <div className='ring' style={{height: 20+level*4, width: 100+level*20}}>
        <p className='number'>{level}</p>
      </div>
    )
  }

  function Column({arrayData, index, color}) {
    return(
        <button className='column' onClick={() => handleClickColumn(index)}>
          <div className='stick' style={{backgroundColor: color}}></div>
          {arrayData.map((ring, index) => (
            <Ring key={index} level={ring} />
          ))}
        </button>
    )
  }

  function displayNum(num) {
    const second = Math.floor(num/100)
    const hundredths = String(num % 100).padStart(2, "0")
    return (
      <p>{second}.{hundredths}</p>
    )
  }

  return (
    <div className="cont">
      <div className="cont-game">
        <h1>towers of hanoi</h1>
        <div className='lifting'><div>{lifting && <Ring level={lifting}/>}</div></div>
        <div className='columns'>
          {
            Array(3).fill(null).map((_, index) => (
              <Column key={index} arrayData={dataGame[index]} index={index} color={"red"}/>
            ))
          }
        </div>
      </div>
      <div id="wrap-timer">
          <p className="timer">{displayNum(timer)}</p>
      </div>
    </div>
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

export default Game